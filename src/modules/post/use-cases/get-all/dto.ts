import type { PaginateOptions } from '@/shared/paginate'
import type { Post, User, Category } from '@prisma/client'

export type GetPostsQuery = PaginateOptions &
  Pick<Post, 'authorId' | 'categoryId'> & {
    search?: string
    published?: boolean
  }

export type PostSummary = Post & {
  author: Pick<User, 'id' | 'name' | 'email'>
  category?: Pick<Category, 'id' | 'name'>
  _count: {
    comments: number
    likes: number
  }
}
