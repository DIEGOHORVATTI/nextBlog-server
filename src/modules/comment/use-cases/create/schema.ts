import { z, createSchemaBuilder } from '@/lib/create-schema-builder'

import type { CreateCommentDto } from './dto'

export const createCommentSchema = createSchemaBuilder<CreateCommentDto>({
  content: () => z.string().min(1, 'Content is required').max(1000, 'Content too long'),
  postId: () => z.string().uuid('Invalid post ID'),
  parentId: () => z.string().uuid('Invalid parent comment ID').nullable(),
})
