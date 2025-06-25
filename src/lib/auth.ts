import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN_DAYS } from '@/constants/config'

import type { Auth } from '../types/auth'

export const generateToken = (user: Auth) => {
  const jwtSignOptions: jwt.SignOptions = {
    expiresIn: JWT_EXPIRES_IN_DAYS,
  }

  return jwt.sign(user, JWT_SECRET, jwtSignOptions)
}

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET) as Auth

export const hashPassword = async (password: string): Promise<string> => bcrypt.hash(password, 12)

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> =>
  bcrypt.compare(password, hashedPassword)
