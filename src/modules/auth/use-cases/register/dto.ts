import type { User } from '@prisma/client'

export type RegisterData = Pick<User, 'email' | 'password' | 'name' | 'role'>
