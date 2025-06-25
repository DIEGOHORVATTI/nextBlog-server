import { prisma } from '@/lib/prisma'
import { error } from '@/errors/error'

import type { PostDetail } from './dto'

export const getPostService = async (id: string): Promise<PostDetail> => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
      comments: {
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  })

  if (!post) {
    return error('NOT_FOUND', {
      error: 'Post not found',
      details: 'The requested post does not exist',
    })
  }

  return post
}
