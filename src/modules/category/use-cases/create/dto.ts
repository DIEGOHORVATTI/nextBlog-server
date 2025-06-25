import type { Category } from '@prisma/client'

export type CreateCategoryDto = Pick<Category, 'name' | 'description' | 'color'>
