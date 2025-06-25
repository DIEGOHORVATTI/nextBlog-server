import type { ZodType } from 'zod'

import { z } from 'zod'
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'

extendZodWithOpenApi(z)

type SchemaBuilder<T> = {
  [K in keyof T]-?: () => ZodType<T[K]>
}

export function createSchemaBuilder<T>(map: SchemaBuilder<T>): ZodType<T> {
  const shape: z.ZodRawShape = {}

  for (const key in map) {
    shape[key] = map[key]().optional()
  }

  return z.object(shape) as unknown as ZodType<T>
}

export { z }
