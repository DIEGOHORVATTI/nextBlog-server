import { StatusCodes, getReasonPhrase } from 'http-status-codes'

export interface ErrorDetails {
  error: string
  details?: string
}

export const error = (
  code: keyof typeof StatusCodes,
  { error: errorMsg, details }: ErrorDetails
) => {
  const status: number = StatusCodes[code]

  const err = new Error(errorMsg)
  err.name = getReasonPhrase(status)
  err.stack = details || ''

  Object.assign(err, { status, details })

  throw err
}
