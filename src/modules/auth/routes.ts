import type { CookieOptions } from 'express'

import { RouteBuilder } from '@/lib/route-builder'
import { SECURE_COOKIE, HTTP_ONLY_COOKIE, SAME_SITE_COOKIE } from '@/constants/config'

import { login } from './use-cases/login/service'
import { loginSchema } from './use-cases/login/schema'
import { register } from './use-cases/register/service'
import { registerUserSchema } from './use-cases/register/schema'
import { verifyCodeSchema } from './use-cases/verify-code/schema'
import { verifyCodeService } from './use-cases/verify-code/service'
import { resetPasswordSchema } from './use-cases/reset-password/schema'
import { resetPasswordService } from './use-cases/reset-password/service'
import { recoverPasswordSchema } from './use-cases/recover-password/schema'
import { recoverPasswordService } from './use-cases/recover-password/service'

const authRouter = new RouteBuilder().group({ prefix: '/auth', tags: ['Auth'] })

const COOKIE_NAME = 'token'

const cookieOptions: CookieOptions = {
  httpOnly: HTTP_ONLY_COOKIE,
  secure: SECURE_COOKIE,
  sameSite: SAME_SITE_COOKIE,
}

authRouter.post(
  '/login',
  async ({ body }, res) => {
    const { user, token } = await login(body)

    res.cookie(COOKIE_NAME, token, cookieOptions)

    return res.status(200).json({ user })
  },
  {
    body: loginSchema,
    description: 'Realiza o login do usuário',
  }
)

authRouter.post(
  '/register',
  async ({ body }, res) => {
    const { user, token } = await register(body)

    res.cookie(COOKIE_NAME, token, cookieOptions)

    return res.status(201).json({ user })
  },
  {
    description: 'Registra um novo usuário',
    body: registerUserSchema,
  }
)

authRouter.get('/logout', async (req, res) => {
  res.clearCookie(COOKIE_NAME, cookieOptions)

  return res.status(204).send()
})

authRouter.post(
  '/recover-password',
  async ({ body }) => {
    await recoverPasswordService(body)

    return { message: 'Código de recuperação enviado para o e-mail' }
  },
  {
    body: recoverPasswordSchema,
    description: 'Envia código de recuperação de senha',
  }
)

authRouter.post('/verify-code', async ({ body }) => verifyCodeService(body), {
  description: 'Verifica o código de recuperação de senha',
  body: verifyCodeSchema,
})

authRouter.post('/reset-password', async ({ body }) => resetPasswordService(body), {
  body: resetPasswordSchema,
  description: 'Redefine a senha do usuário',
})

export default authRouter.export()
