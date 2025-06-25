import type { BaseEntity } from './common'

export interface Category extends BaseEntity {
  name: string
  slug: string
  description?: string
  color?: string
  icon?: string
  parentId?: string // Para categorias hierárquicas
  isActive: boolean
  postsCount: number
  parent?: Category
  children: Category[]
}

export interface CreateCategoryDto {
  name: string
  description?: string
  color?: string
  icon?: string
  parentId?: string
}

export interface UpdateCategoryDto {
  name?: string
  description?: string
  color?: string
  icon?: string
  parentId?: string
  isActive?: boolean
}

export interface CategoryFilters {
  isActive?: boolean
  parentId?: string | null
  search?: string
  limit?: number
  offset?: number
}
