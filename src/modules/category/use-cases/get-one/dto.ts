import type { Category } from '@prisma/client'

export type GetCategory = Category & {
  _count: {
    posts: number
  }
}
