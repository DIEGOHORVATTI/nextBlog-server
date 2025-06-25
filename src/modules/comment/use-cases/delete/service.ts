import { error } from '@/lib/result'
import { prisma } from '@/lib/prisma'

export const deleteCommentService = async (id: string, userId: string) => {
  const existingComment = await prisma.comment.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          replies: true,
        },
      },
    },
  })

  if (!existingComment) {
    return error('NOT_FOUND', 'Comment not found')
  }

  if (existingComment.authorId !== userId) {
    return error('FORBIDDEN', 'Access denied')
  }

  return await prisma.comment.delete({
    where: { id },
  })
}
