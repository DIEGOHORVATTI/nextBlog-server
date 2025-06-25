import type { Request } from 'express'
import type { User } from '@prisma/client'

export type Auth = Pick<User, 'id' | 'email' | 'name' | 'role'>

export type AuthRequest = Request & {
  user: Auth
}

export type JwtPayload = Auth & {
  iat: number
  exp: number
}

export interface AuthResponse {
  user: Omit<User, 'password'>
  token: string
}
