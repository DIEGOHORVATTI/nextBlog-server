import type { Comment } from '@prisma/client'

export type UpdateCommentDto = Pick<Comment, 'content'>
