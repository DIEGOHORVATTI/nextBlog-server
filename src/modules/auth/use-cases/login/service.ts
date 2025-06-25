import type { AuthResponse } from '@/types/auth'

import { prisma } from '@/lib/prisma'
import { generateToken, comparePassword } from '@/lib/auth'

import type { LoginData } from './dto'

export async function login({ email, password }: LoginData): Promise<AuthResponse> {
  const authenticatedUser = await prisma.user.findUnique({ where: { email } })

  if (!authenticatedUser || !(await comparePassword(password, authenticatedUser.password))) {
    throw new Error('Invalid email or password')
  }

  const token = generateToken(authenticatedUser)

  const { password: _password, ...user } = authenticatedUser

  return { user, token }
}
