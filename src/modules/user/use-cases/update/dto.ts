import type { User } from '@prisma/client'

export type UpdateUserDTO = Partial<Pick<User, 'email' | 'name' | 'password' | 'role'>>
