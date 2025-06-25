import { error } from '@/lib/result'
import { prisma } from '@/lib/prisma'

export const getCategoryService = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  })

  if (!category) {
    return error('NOT_FOUND', 'Category not found')
  }

  return category
}
