import { prisma } from '@/lib/prisma'
import { error } from '@/errors/error'
import { hashPassword } from '@/lib/auth'

import type { ResetPasswordData } from './dto'

export const resetPasswordService = async ({ email, newPassword, code }: ResetPasswordData) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { resetPassword: true },
  })

  if (!user) {
    throw error('NOT_FOUND', { error: 'Usuário não encontrado' })
  }

  if (!user.resetPassword?.code) {
    throw error('BAD_REQUEST', { error: 'Nenhum código de recuperação foi gerado' })
  }

  if (user.resetPassword.code !== code) {
    throw error('UNAUTHORIZED', { error: 'Código inválido' })
  }

  if (!user.resetPassword.expires || user.resetPassword.expires < new Date()) {
    throw error('BAD_REQUEST', { error: 'Código expirado' })
  }

  const hashedPassword = await hashPassword(newPassword)

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    }),

    prisma.resetPassword.update({
      where: { userId: user.id },
      data: {
        code: undefined,
        expires: undefined,
        attempts: 0,
      },
    }),
  ])

  return { message: 'Senha redefinida com sucesso' }
}
