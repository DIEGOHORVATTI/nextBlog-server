import { error } from '@/lib/result'
import { prisma } from '@/lib/prisma'

import type { CreateCommentDto } from './dto'

export const createCommentService = async (
  authorId: string,
  { content, postId, parentId }: CreateCommentDto
) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  })

  if (!post) {
    return error('NOT_FOUND', 'Post not found')
  }

  // Check if parent comment exists (if provided)
  if (parentId) {
    const parentComment = await prisma.comment.findUnique({
      where: { id: parentId },
    })

    if (!parentComment) {
      return error('NOT_FOUND', 'Parent comment not found')
    }

    if (parentComment.postId !== postId) {
      return error('BAD_REQUEST', 'Invalid parent comment')
    }
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      parentId,
      authorId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        },
      },
    },
  })

  return comment
}
