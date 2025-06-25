import type { BaseEntity } from './common'

export interface Comment extends BaseEntity {
  content: string
  postId: string
  authorId: string
  parentId?: string // Para replies/respostas
  author: CommentAuthor
  replies: Comment[]
  likesCount: number
  isEdited: boolean
  status: CommentStatus
}

export interface CommentAuthor {
  id: string
  name: string
  avatarUrl?: string
}

export type CommentStatus = 'active' | 'hidden' | 'deleted'

export interface CreateCommentDto {
  content: string
  postId: string
  parentId?: string
}

export interface UpdateCommentDto {
  content: string
}

export interface CommentFilters {
  postId?: string
  authorId?: string
  status?: CommentStatus
  limit?: number
  offset?: number
}
