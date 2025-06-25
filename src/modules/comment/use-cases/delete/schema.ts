import { z, createSchemaBuilder } from '@/lib/create-schema-builder'

import type { DeleteCommentParams } from './dto'

export const deleteCommentSchema = createSchemaBuilder<DeleteCommentParams>({
  id: () => z.string().uuid('Invalid comment ID format'),
})
