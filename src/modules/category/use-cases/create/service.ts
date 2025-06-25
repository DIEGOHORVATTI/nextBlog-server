import { prisma } from '@/lib/prisma'
import { error } from '@/errors/error'

import type { CreateCategoryDto } from './dto'

export const createCategoryService = async ({ name, description, color }: CreateCategoryDto) => {
  const existingCategory = await prisma.category.findUnique({
    where: { name },
  })

  if (existingCategory) {
    error('CONFLICT', {
      error: 'Category already exists',
      details: 'A category with this name already exists',
    })
  }

  const category = await prisma.category.create({
    data: {
      name,
      description,
      color,
    },
  })

  return category
}
