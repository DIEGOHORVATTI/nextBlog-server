import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

import type { UpdateUserDTO } from './dto'

export async function updateUserService(id: string, data: Partial<UpdateUserDTO>) {
  if (data.password) {
    data.password = await hashPassword(data.password)
  }

  return prisma.user.update({
    where: { id },
    data,
  })
}
