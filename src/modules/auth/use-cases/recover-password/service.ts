import { prisma } from '@/lib/prisma'
import { error } from '@/errors/error'
import { transporter } from '@/shared/transporter'
import { renderToStaticMarkup } from 'react-dom/server'
import RecoverPasswordEmail from '@/emails/recover-password-email'
import { MAX_ATTEMPTS, MAIL_USERNAME, CODE_EXPIRATION_TIME } from '@/constants/config'

import type { RecoverPassword } from './dto'

export const recoverPasswordService = async ({ email }: RecoverPassword) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { resetPassword: true },
  })

  if (!user) {
    throw error('NOT_FOUND', { error: 'Usuário não encontrado' })
  }

  if (user.resetPassword && user.resetPassword.attempts >= MAX_ATTEMPTS) {
    throw error('TOO_MANY_REQUESTS', {
      error: 'Número máximo de tentativas de recuperação atingido.',
    })
  }

  const code = Math.floor(100_000 + Math.random() * 900_000).toString()
  const expires = new Date(Date.now() + CODE_EXPIRATION_TIME)

  await prisma.resetPassword.upsert({
    where: { userId: user.id },
    update: { code, expires, attempts: 0 },
    create: { userId: user.id, code, expires },
  })

  const html = renderToStaticMarkup(RecoverPasswordEmail({ code, email }))

  await transporter
    .sendMail({
      from: MAIL_USERNAME,
      to: email,
      subject: 'Solicitação de redefinição de senha',
      text: `Você solicitou uma redefinição de senha. Use o código abaixo para redefinir sua senha: ${code}`,
      html,
    })
    .catch((err) => {
      console.error(err)
      throw error('INTERNAL_SERVER_ERROR', {
        error: 'Falha ao enviar e-mail de recuperação de senha',
      })
    })
}
