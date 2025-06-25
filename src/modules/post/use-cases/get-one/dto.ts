import type { Post, User, Comment, Category } from '@prisma/client'

type PostAuthorDTO = {
  author: Pick<User, 'id' | 'name' | 'avatarUrl'>
}

export type PostDetail = Post &
  PostAuthorDTO & {
    category: Pick<Category, 'id' | 'name' | 'description'> | null
    comments: Array<Pick<Comment, 'id' | 'content' | 'createdAt'> & PostAuthorDTO>
    _count: {
      comments: number
      likes: number
    }
  }
