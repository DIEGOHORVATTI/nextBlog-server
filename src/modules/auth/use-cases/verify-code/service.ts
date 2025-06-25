import { prisma } from '@/lib/prisma'
import { error } from '@/errors/error'
import { MAX_ATTEMPTS } from '@/constants/config'

import type { VerifyCodeData } from './dto'

export const verifyCodeService = async ({ email, code }: VerifyCodeData) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { resetPassword: true },
  })

  if (!user) {
    throw error('NOT_FOUND', { error: 'Usuário não encontrado' })
  }

  const { resetPassword } = user

  if (!resetPassword || !resetPassword.code) {
    throw error('BAD_REQUEST', { error: 'Nenhum código de recuperação foi gerado' })
  }

  if (resetPassword.attempts >= MAX_ATTEMPTS) {
    throw error('TOO_MANY_REQUESTS', {
      error: 'Número máximo de tentativas de verificação atingido',
    })
  }

  if (!resetPassword.expires || resetPassword.expires < new Date()) {
    throw error('BAD_REQUEST', { error: 'Código expirado' })
  }

  if (resetPassword.code !== code) {
    await prisma.resetPassword.update({
      where: { userId: user.id },
      data: { attempts: resetPassword.attempts + 1 },
    })

    throw error('UNAUTHORIZED', { error: 'Código inválido' })
  }

  return { message: 'Código verificado com sucesso' }
}
