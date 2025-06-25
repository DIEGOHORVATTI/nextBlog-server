export interface UpdatePostDto {
  title?: string
  content?: string
  excerpt?: string
  coverUrl?: string
  tags?: string[]
  categoryId?: string
  published?: boolean
}
