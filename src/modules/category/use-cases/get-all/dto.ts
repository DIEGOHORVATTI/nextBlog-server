import type { Category } from '@prisma/client'

export type Categories = Array<
  Category & {
    _count: {
      posts: number
    }
  }
>
