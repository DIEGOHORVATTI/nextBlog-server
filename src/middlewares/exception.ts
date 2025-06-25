import type { ErrorRequestHandler } from 'express'

import { StatusCodes } from 'http-status-codes'

const exception: ErrorRequestHandler = (err, req, res, _next) => {
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR
  const message = err.message || 'Internal Server Error'
  const details = err.details

  res.status(status).json({
    error: message,
    ...(details && { details }),
  })
}

export default exception
