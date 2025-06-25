import { auth } from '@/middlewares/auth'
import { RouteBuilder } from '@/lib/route-builder'

import { error } from '../../lib/result'
import { getPostsSchema } from './use-cases/get-all/schema'
import { createPostSchema } from './use-cases/create/schema'
import { getPostService } from './use-cases/get-one/service'
import { getPostsService } from './use-cases/get-all/service'
import { createPostService } from './use-cases/create/service'
import { updatePostService } from './use-cases/update/service'
import { deletePostService } from './use-cases/delete/service'

const postRouter = new RouteBuilder().group({ prefix: '/posts', tags: ['Posts'] }).use(auth)

postRouter.post(
  '/',
  async ({ body, user }, res) => {
    const post = await createPostService(user.id, body)

    return res.status(201).json(post)
  },
  {
    body: createPostSchema,
    description: 'Create a new post',
  }
)

postRouter.get(
  '/',
  async ({ query }, res) => {
    const posts = await getPostsService(query)

    return res.json(posts)
  },
  {
    query: getPostsSchema,
    description: 'Get all posts with pagination and filters',
  }
)

postRouter.get(
  '/:id',
  async ({ params }, res) => {
    const post = await getPostService(params.id)

    if (!post) return error('NOT_FOUND', 'Post not found')

    return res.json(post)
  },
  {
    description: 'Get a post by ID',
  }
)

postRouter.put(
  '/:id',
  async ({ params, body, user }, res) => {
    const post = await updatePostService(params.id, user.id, body)

    return res.json(post)
  },
  {
    description: 'Update a post',
  }
)

postRouter.delete(
  '/:id',
  async ({ params: { id }, user }, res) => {
    const result = await deletePostService(id, user.id)

    return res.status(204).send(result)
  },
  {
    description: 'Delete a post',
  }
)

export default postRouter.export()
