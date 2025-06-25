import type { Category } from '@prisma/client'

export type UpdateCategoryDto = Partial<Pick<Category, 'name' | 'description' | 'color'>>

export type UpdateCategoryResponse = Omit<Category, 'createdAt' | 'updatedAt'> & {
  createdAt: string
  updatedAt: string
}
