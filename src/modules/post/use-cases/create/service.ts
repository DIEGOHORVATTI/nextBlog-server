import { error } from '@/lib/result'
import { prisma } from '@/lib/prisma'

import type { CreatePostDto } from './dto'

export const createPostService = async (
  authorId: string,
  { categoryId, publishedAt, tags, visibility = 'PUBLIC', ...rest }: CreatePostDto
) => {
  if (categoryId) {
    const category = await prisma.category.findUnique({ where: { id: categoryId } })
    if (!category) {
      return error('NOT_FOUND', 'Categoria não encontrada')
    }
  }

  const post = await prisma.post.create({
    data: {
      ...rest,
      authorId,
      publishedAt: publishedAt ? new Date() : undefined,
      tags: {
        connect: tags?.map((id) => ({ id })),
      },
    },
    include: { tags: true },
  })

  return post
}
