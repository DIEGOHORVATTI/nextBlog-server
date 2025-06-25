import { auth } from '@/middlewares/auth'
import { RouteBuilder } from '@/lib/route-builder'

import { createCategorySchema } from './use-cases/create/schema'
import { updateCategorySchema } from './use-cases/update/schema'
import { getCategoryService } from './use-cases/get-one/service'
import { createCategoryService } from './use-cases/create/service'
import { updateCategoryService } from './use-cases/update/service'
import { deleteCategoryService } from './use-cases/delete/service'
import { getCategoriesService } from './use-cases/get-all/service'

const categoryRouter = new RouteBuilder()
  .group({ prefix: '/category', tags: ['Category'] })
  .use(auth)

categoryRouter.post(
  '/',
  async ({ body }, res) => {
    const category = await createCategoryService(body)

    return res.status(201).json(category)
  },
  {
    body: createCategorySchema,
    description: 'Create a new category',
  }
)

categoryRouter.get(
  '/',
  async (req, res) => {
    const categories = await getCategoriesService()

    return res.json(categories)
  },
  {
    description: 'Get all categories',
  }
)

categoryRouter.get(
  '/:id',
  async ({ params }, res) => {
    const category = await getCategoryService(params.id)

    if (!category) return res.status(404).json({ error: 'Category not found' })

    return res.json(category)
  },
  {
    description: 'Get a category by ID',
  }
)

categoryRouter.put(
  '/:id',
  async ({ params: { id }, body }, res) => {
    const category = await updateCategoryService(id, body)

    return res.json(category)
  },
  {
    body: updateCategorySchema,
    description: 'Update a category',
  }
)

categoryRouter.delete(
  '/:id',
  async ({ params: { id } }, res) => {
    await deleteCategoryService(id)

    return res.status(204).json({
      message: 'Category deleted successfully',
    })
  },
  {
    description: 'Delete a category',
  }
)

export default categoryRouter.export()
