import { prisma } from '@/lib/prisma'
import { error } from '@/errors/error'

import type { UpdateCategoryDto, UpdateCategoryResponse } from './dto'

export const updateCategoryService = async (
  id: string,
  { name, description, color }: UpdateCategoryDto
): Promise<UpdateCategoryResponse> => {
  const existingCategory = await prisma.category.findUnique({
    where: { id },
  })

  if (!existingCategory) {
    return error('NOT_FOUND', {
      error: 'Category not found',
      details: 'The requested category does not exist',
    })
  }

  if (name !== existingCategory.name) {
    const nameConflict = await prisma.category.findUnique({
      where: { name },
    })

    if (nameConflict) {
      return error('CONFLICT', {
        error: 'Category name already exists',
        details: 'A category with this name already exists',
      })
    }
  }

  const category = await prisma.category.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(description !== undefined && { description }),
      ...(color !== undefined && { color }),
    },
  })

  const response: UpdateCategoryResponse = {
    ...category,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString(),
  }

  return response
}
