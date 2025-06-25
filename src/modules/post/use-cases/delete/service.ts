import { error } from '@/lib/result'
import { prisma } from '@/lib/prisma'

export const deletePostService = async (id: string, userId: string) => {
  const existingPost = await prisma.post.findUnique({
    where: { id },
  })

  if (!existingPost) {
    return error('NOT_FOUND', 'Post not found')
  }

  if (existingPost.authorId !== userId) {
    return error('FORBIDDEN', 'Access denied')
  }

  await prisma.post.delete({
    where: { id },
  })

  return {
    message: 'Post deleted successfully',
    deletedId: id,
  }
}
