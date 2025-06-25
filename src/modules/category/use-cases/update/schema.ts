import { z, createSchemaBuilder } from '@/lib/create-schema-builder'

import type { UpdateCategoryDto } from './dto'

export const updateCategorySchema = createSchemaBuilder<UpdateCategoryDto>({
  name: () => z.string().min(1, 'Name is required').max(100, 'Name too long').optional(),
  description: () => z.string().max(500, 'Description too long').optional(),
  color: () =>
    z
      .string()
      .regex(/^#[0-9A-F]{6}$/i, 'Invalid color format')
      .optional(),
})
