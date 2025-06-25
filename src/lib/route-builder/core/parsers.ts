import type { ZodSchema } from 'zod'
import type { RequestHandler } from 'express'

export function createBodyParser(schema: ZodSchema): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      res.status(400).json({ error: 'Invalid body', issues: result.error.issues })
    }

    req.body = result.data
    next()
  }
}

export function createQueryParser(schema: ZodSchema): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.query)

    if (!result.success) {
      res.status(400).json({ error: 'Invalid query', issues: result.error.issues })
    }

    req.query = result.data
    next()
  }
}
