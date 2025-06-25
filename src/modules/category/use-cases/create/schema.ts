import { z, createSchemaBuilder } from '@/lib/create-schema-builder'

import type { CreateCategoryDto } from './dto'

export const createCategorySchema = createSchemaBuilder<CreateCategoryDto>({
  name: () => z.string().min(1, 'Name is required').max(100, 'Name too long'),
  description: () => z.string().max(500, 'Description too long').nullable(),
  color: () =>
    z
      .string()
      .regex(/^#[0-9A-F]{6}$/i, 'Invalid color format')
      .nullable(),
})
