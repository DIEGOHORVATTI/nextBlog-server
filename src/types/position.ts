import type { BaseEntity } from './common'

export interface Position extends BaseEntity {
  name: string
  description?: string
  color: string
  icon?: string
  level: number // Nível hierárquico (1 = mais alto)
  permissions: string[]
  isActive: boolean
}

export interface CreatePositionDto {
  name: string
  description?: string
  color: string
  icon?: string
  level: number
  permissions: string[]
}

export interface UpdatePositionDto {
  name?: string
  description?: string
  color?: string
  icon?: string
  level?: number
  permissions?: string[]
  isActive?: boolean
}

export interface UserPosition {
  userId: string
  positionId: string
  assignedBy: string
  assignedAt: string
  expiresAt?: string
  isActive: boolean
}
