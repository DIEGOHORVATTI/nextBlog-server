import { z, createSchemaBuilder } from '@/lib/create-schema-builder'

import type { UpdateCommentDto } from './dto'

export const updateCommentSchema = createSchemaBuilder<UpdateCommentDto>({
  content: () => z.string().min(1, 'Content is required').max(1000, 'Content too long'),
})
