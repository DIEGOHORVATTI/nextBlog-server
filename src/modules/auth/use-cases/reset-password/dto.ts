import type { User, ResetPassword } from '@prisma/client'

export type ResetPasswordData = Pick<User, 'email'> &
  Pick<ResetPassword, 'code'> & {
    newPassword: string
  }
