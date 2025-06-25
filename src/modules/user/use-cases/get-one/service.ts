import { prisma } from '@/lib/prisma'

export async function getUserByIdService(id: string) {
  const { password, ...user } = await prisma.user.findUniqueOrThrow({
    where: { id },
  })

  return { user }
}
