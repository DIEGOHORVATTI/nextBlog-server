import type { User } from '@prisma/client'

export type LoginData = Pick<User, 'email' | 'password'>
