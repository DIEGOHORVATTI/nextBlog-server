import { PostStatus, Visibility } from '@prisma/client'
import { z, createSchemaBuilder } from '@/lib/create-schema-builder'

import type { CreatePostDto } from './dto'

export const createPostSchema = createSchemaBuilder<CreatePostDto>({
  title: () => z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: () => z.string().min(1, 'Content is required'),
  excerpt: () => z.string().max(500, 'Excerpt too long'),
  coverUrl: () => z.string().url('Invalid URL format'),
  tags: () => z.array(z.string()).optional(),
  categoryId: () => z.string().uuid('Invalid category ID'),
  publishedAt: () => z.date().nullable(),
  status: () => z.nativeEnum(PostStatus),
  visibility: () => z.nativeEnum(Visibility),
})
