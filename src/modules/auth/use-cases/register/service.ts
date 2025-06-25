import { prisma } from '@/lib/prisma'
import { error } from '@/errors/error'
import { hashPassword, generateToken } from '@/lib/auth'

import type { RegisterData } from './dto'

export async function register({ email, password, name, role }: RegisterData) {
  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) {
    throw error('CONFLICT', { error: 'Email already registered' })
  }

  const hashedPassword = await hashPassword(password)
  const authenticatedUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: role || 'USER',
    },
  })

  const { password: _password, ...user } = authenticatedUser

  const token = generateToken(user)

  return { user, token }
}
