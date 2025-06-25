import type { User } from '@prisma/client'

export type RecoverPassword = Pick<User, 'email'>
