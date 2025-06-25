import type { Comment } from './comment'
import type { BaseEntity } from './common'
import type { Category } from './category'

export interface Post extends BaseEntity {
  title: string
  content: string // Original markdown content
  contentHtml?: string // Processed HTML content
  contentPlain?: string // Plain text for search
  description: string
  coverUrl?: string
  tags: string[]
  publish: PublishStatus
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
  totalViews: number
  totalShares: number
  totalComments: number
  totalLikes: number
  author: PostAuthor
  comments: Comment[]
  categories: Category[]
  categoryIds: string[]
  likesCount: number
  commentsCount: number
  // Markdown-specific fields
  readingTime?: number // in minutes
  wordCount?: number
  tableOfContents?: TableOfContentsItem[]
}

export interface TableOfContentsItem {
  id: string
  title: string
  level: number // 1-6 for h1-h6
  children?: TableOfContentsItem[]
}

export interface PostAuthor {
  id: string
  name: string
  avatarUrl?: string
}

export type PublishStatus = 'draft' | 'published'

export interface CreatePostDto {
  title: string
  content: string // Markdown content
  description?: string
  tags?: string[]
  coverUrl?: string
  publish?: PublishStatus
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
  categoryIds?: string[]
}

export interface UpdatePostDto {
  title?: string
  content?: string // Markdown content
  description?: string
  tags?: string[]
  coverUrl?: string
  publish?: PublishStatus
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
  categoryIds?: string[]
}

export interface PostFilters {
  publish?: PublishStatus | 'all'
  categoryId?: string
  authorId?: string
  limit?: number
  offset?: number
  search?: string
  tags?: string[]
}
