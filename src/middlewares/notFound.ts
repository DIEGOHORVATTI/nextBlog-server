import type { RequestHandler } from 'express'

import { error } from '@/lib/result'

const notFound: RequestHandler = (req, res, next) => {
  next(error('NOT_FOUND', 'Resource not found'))
}

export default notFound
