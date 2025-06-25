import type { UserRole } from '@prisma/client'
import type { AuthRequest } from '@/types/auth'
import type { TypedMiddleware } from '@/lib/route-builder/types'

import { error } from '@/lib/result'

export const authorize = (roles: Array<UserRole>): TypedMiddleware<Pick<AuthRequest, 'user'>> => ({
  middleware: (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(error('FORBIDDEN', 'Insufficient permissions.'))
    }

    return next()
  },
})
