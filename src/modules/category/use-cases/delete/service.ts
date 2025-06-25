import { prisma } from '@/lib/prisma'
import { error } from '@/errors/error'

export const deleteCategoryService = async (id: string) => {
  const existingCategory = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  })

  if (!existingCategory) {
    throw error('NOT_FOUND', {
      error: 'Category not found',
      details: 'The requested category does not exist',
    })
  }

  if (existingCategory._count.posts > 0) {
    throw error('CONFLICT', {
      error: 'Cannot delete category with posts',
      details: 'This category has associated posts and cannot be deleted',
    })
  }

  await prisma.category.delete({
    where: { id },
  })
}
