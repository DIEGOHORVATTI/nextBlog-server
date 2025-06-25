import { error } from '@/lib/result'
import { prisma } from '@/lib/prisma'
import { paginate } from '@/shared/paginate'

import type { GetCommentsQuery } from './dto'

export const getCommentsService = async (postId: string, query: GetCommentsQuery) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  })

  if (!post) {
    return error('NOT_FOUND', 'Post not found')
  }

  const { data, ...meta } = await paginate(async (skip, take) => {
    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: {
          postId,
          parentId: null,
        },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
          replies: {
            orderBy: { createdAt: 'asc' },
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  avatarUrl: true,
                },
              },
              _count: {
                select: {
                  replies: true,
                },
              },
            },
          },
          _count: {
            select: {
              replies: true,
            },
          },
        },
      }),
      prisma.comment.count({
        where: {
          postId,
          parentId: null,
        },
      }),
    ])

    return [comments, total]
  }, query)

  return {
    comments: data.map((comment) => ({
      ...comment,
      replies: comment.replies.map((reply) => ({
        ...reply,
        hasReplies: reply._count.replies > 0,
      })),
    })),
    meta,
  }
}
