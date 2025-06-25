import { prisma } from '@/lib/prisma'

import type { Categories } from './dto'

export const getCategoriesService = async (): Promise<Categories> => {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  })

  return categories
}
