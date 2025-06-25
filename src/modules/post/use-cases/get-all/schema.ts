import { z, createSchemaBuilder } from '@/lib/create-schema-builder'

import type { GetPostsQuery } from './dto'

export const getPostsSchema = createSchemaBuilder<GetPostsQuery>({
  page: () => z.number().int().min(1).default(1).optional(),
  limit: () => z.number().int().min(1).max(100).default(10).optional(),
  search: () => z.string().min(1).optional(),
  categoryId: () => z.string().uuid().nullable(),
  published: () => z.boolean().optional(),
  authorId: () => z.string().uuid(),
})
