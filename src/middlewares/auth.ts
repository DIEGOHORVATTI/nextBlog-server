import type { TypedMiddleware } from '@/lib/route-builder/types'

import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { ok, err, match, error } from '@/lib/result'

import type { AuthRequest } from '../types/auth'

const getUserFromToken = async (token: string) => {
  try {
    const decoded = verifyToken(token)

    const user = await prisma.user.findUnique({ where: { id: decoded.id } })

    if (!user) return err('Invalid token')
    if (!user.isActive) return err('User is inactive')

    return ok(decoded)
  } catch {
    return err('Invalid token')
  }
}

export const auth: TypedMiddleware<Pick<AuthRequest, 'user'>> = {
  middleware: async (req, _res, next) => {
    const token = req.cookies?.token

    if (!token) {
      return next(error('UNAUTHORIZED', 'Access denied. No token provided.'))
    }

    const result = await getUserFromToken(token)

    return match(result, {
      ok: (user) => {
        req.user = user
        next()
      },
      err: (msg) => {
        next(error('UNAUTHORIZED', msg))
      },
    })
  },
}
