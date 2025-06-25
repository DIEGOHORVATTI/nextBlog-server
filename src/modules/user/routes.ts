import { auth } from '@/middlewares/auth'
import { RouteBuilder } from '@/lib/route-builder'

import { updateUserSchema } from './use-cases/update/schema'
import { updateUserService } from './use-cases/update/service'
import { getUserByIdService } from './use-cases/get-one/service'

const userRouter = new RouteBuilder().use(auth).group({ prefix: '/user', tags: ['User'] })

userRouter.get(
  '/me',
  async ({ user: { id } }, res) => {
    const user = await getUserByIdService(id)

    if (!user) return res.status(404).json({ error: 'User not found' })

    return res.json(user)
  },
  {
    description: 'Retorna os dados do usuário autenticado',
  }
)

userRouter.get(
  '/:id',
  async ({ params: { id } }, res) => {
    const userData = await getUserByIdService(id)

    if (!userData) return res.status(404).json({ error: 'User not found' })

    return res.json(userData)
  },
  {
    description: 'Retorna os dados de um usuário pelo ID',
  }
)

userRouter.put(
  '/me',
  async ({ body, user: { id } }) => {
    const updatedUser = await updateUserService(id, body)

    return { updatedUser }
  },
  {
    body: updateUserSchema,
    description: 'Atualiza os dados do usuário autenticado',
  }
)

export default userRouter.export()
