import type { BaseEntity } from './common'

export interface Like extends BaseEntity {
  userId: string
  targetId: string // ID do post ou comentário
  targetType: LikeTargetType
  user: LikeUser
}

export interface LikeUser {
  id: string
  name: string
  avatarUrl?: string
}

export type LikeTargetType = 'post' | 'comment'

export interface CreateLikeDto {
  targetId: string
  targetType: LikeTargetType
}

export interface LikeStats {
  totalLikes: number
  userHasLiked: boolean
  recentLikes: LikeUser[]
}
