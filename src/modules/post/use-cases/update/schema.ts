import { z, createSchemaBuilder } from '@/lib/create-schema-builder'

import type { UpdatePostDto } from './dto'

export const updatePostSchema = createSchemaBuilder<UpdatePostDto>({
  title: () => z.string().min(1, 'Title is required').max(200, 'Title too long').optional(),
  content: () => z.string().min(1, 'Content is required').optional(),
  excerpt: () => z.string().max(500, 'Excerpt too long').optional(),
  coverUrl: () => z.string().url('Invalid URL format').optional(),
  tags: () => z.array(z.string()).optional(),
  categoryId: () => z.string().uuid('Invalid category ID').optional(),
  published: () => z.boolean().optional(),
})
