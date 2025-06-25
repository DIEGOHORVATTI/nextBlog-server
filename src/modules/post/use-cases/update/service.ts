import { prisma } from '@/lib/prisma'
import { error } from '@/errors/error'

import type { UpdatePostDto } from './dto'

export const updatePostService = async (
  id: string,
  userId: string,
  { categoryId, title, content, excerpt, coverUrl, tags, published }: UpdatePostDto
) => {
  // Check if post exists and user is the author
  const existingPost = await prisma.post.findUnique({
    where: { id },
  })

  if (!existingPost) {
    return error('NOT_FOUND', {
      error: 'Post not found',
      details: 'The requested post does not exist',
    })
  }

  if (existingPost.authorId !== userId) {
    return error('FORBIDDEN', {
      error: 'Access denied',
      details: 'You can only update your own posts',
    })
  }

  // Check if category exists
  if (categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    })

    if (!category) {
      error('NOT_FOUND', {
        error: 'Category not found',
        details: 'The specified category does not exist',
      })
    }
  }

  const updateData: any = {}
  if (title !== undefined) updateData.title = title
  if (content !== undefined) updateData.content = content
  if (excerpt !== undefined) updateData.excerpt = excerpt
  if (coverUrl !== undefined) updateData.coverUrl = coverUrl
  if (tags !== undefined) updateData.tags = tags
  if (categoryId !== undefined) updateData.categoryId = categoryId
  if (published !== undefined) updateData.published = published

  const post = await prisma.post.update({
    where: { id },
    data: updateData,
  })

  return post
}
