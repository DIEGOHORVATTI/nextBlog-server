import { z, createSchemaBuilder } from '@/lib/create-schema-builder'

import type { PaginateOptions } from '.'

export const paginationSchema = createSchemaBuilder<PaginateOptions>({
  page: () => z.number().int().min(1).default(1).optional(),
  limit: () => z.number().int().min(1).max(50).default(20).optional(),
})
