export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt?: string
}

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}
