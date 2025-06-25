import type { Comment } from '@prisma/client'

export type CreateCommentDto = Pick<Comment, 'content' | 'postId' | 'parentId'>
