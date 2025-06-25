import { auth } from '@/middlewares/auth'
import { RouteBuilder } from '@/lib/route-builder'
import { paginationSchema } from '@/shared/paginate/schema'

import { createCommentSchema } from './use-cases/create/schema'
import { updateCommentSchema } from './use-cases/update/schema'
import { deleteCommentSchema } from './use-cases/delete/schema'
import { getCommentsService } from './use-cases/get-all/service'
import { createCommentService } from './use-cases/create/service'
import { updateCommentService } from './use-cases/update/service'
import { deleteCommentService } from './use-cases/delete/service'

const commentRouter = new RouteBuilder()
  .group({ prefix: '/comments', tags: ['Comments'] })
  .use(auth)

commentRouter.post(
  '/',
  async ({ body, user }, res) => {
    const comment = await createCommentService(user.id, body)

    return res.status(201).json(comment)
  },
  {
    body: createCommentSchema,
    description: 'Create a new comment',
  }
)

commentRouter.get(
  '/post/:postId',
  async ({ params, query }, res) => {
    const comments = await getCommentsService(params.postId, query)

    return res.json(comments)
  },
  {
    query: paginationSchema,
    description: 'Get comments for a specific post',
  }
)

commentRouter.put(
  '/:id',
  async ({ params: { id }, body, user }, res) => {
    const comment = await updateCommentService(id, body, user.id)

    return res.json(comment)
  },
  {
    body: updateCommentSchema,
    description: 'Update a comment',
  }
)

commentRouter.delete(
  '/:id',
  async ({ params, user }, res) => {
    await deleteCommentService(params.id, user.id)

    return res.status(204).send()
  },
  {
    body: deleteCommentSchema,
    description: 'Delete a comment',
  }
)

export default commentRouter.export()
