import type { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { paginate } from '@/shared/paginate'

import type { GetPostsQuery } from './dto'

export const getPostsService = async ({
  page = 1,
  limit = 10,
  search,
  categoryId,
  published,
  authorId,
}: GetPostsQuery) => {
  const where: Prisma.PostWhereInput = {}

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } },
      { excerpt: { contains: search, mode: 'insensitive' } },
    ]
  }

  if (categoryId) {
    where.categoryId = categoryId
  }

  if (published !== undefined) {
    where.publishedAt = published ? { not: null } : null
  }

  if (authorId) {
    where.authorId = authorId
  }

  const { data, ...meta } = await paginate(
    async (skip, take) => {
      const [posts, total] = await Promise.all([
        prisma.post.findMany({
          where,
          skip,
          take,
          orderBy: { createdAt: 'desc' },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            category: {
              select: {
                id: true,
                name: true,
              },
            },
            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
          },
        }),
        prisma.post.count({ where }),
      ])
      return [posts, total]
    },
    { page, limit }
  )

  return {
    posts: data,
    meta,
  }
}
