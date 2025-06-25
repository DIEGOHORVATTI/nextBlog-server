import type { User } from '@prisma/client'

export type VerifyCodeData = Pick<User, 'email'> & {
  code: string
}
