import type { Post } from '@prisma/client'

export type CreatePostDto = {
  tags?: Array<string>
} & Pick<
  Post,
  | 'title'
  | 'content'
  | 'excerpt'
  | 'coverUrl'
  | 'categoryId'
  | 'status'
  | 'publishedAt'
  | 'visibility'
>
