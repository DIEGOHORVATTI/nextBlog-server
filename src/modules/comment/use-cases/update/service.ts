import { error } from '@/lib/result'
import { prisma } from '@/lib/prisma'

import type { UpdateCommentDto } from './dto'

export const updateCommentService = async (
  id: string,
  { content }: UpdateCommentDto,
  userId: string
) => {
  const existingComment = await prisma.comment.findUnique({
    where: { id },
  })

  if (!existingComment) {
    return error('NOT_FOUND', 'Comment not found')
  }

  if (existingComment.authorId !== userId) {
    return error('FORBIDDEN', 'You can only update your own comments')
  }

  const comment = await prisma.comment.update({
    where: { id },
    data: { content },
  })

  return comment
}
