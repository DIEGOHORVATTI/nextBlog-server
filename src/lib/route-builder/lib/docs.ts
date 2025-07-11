import type { ZodObject, ZodSchema } from 'zod'
import type { OpenAPIObjectConfig } from '@asteasolutions/zod-to-openapi/dist/v3.0/openapi-generator'

import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi'

import type { Method, RouteOptions } from '../types'

type RegisteredRoute = Pick<RouteOptions, 'tags' | 'prefix' | 'summary' | 'description'> & {
  method: Method
  path: string
  body?: ZodSchema
  query?: ZodSchema
}

const registeredRoutes: Array<RegisteredRoute> = []

export default function openApi(config: OpenAPIObjectConfig) {
  const registry = new OpenAPIRegistry()

  registeredRoutes.forEach(({ method, path, body, query, summary, description, tags }) => {
    registry.registerPath({
      method,
      path,
      summary,
      description,
      tags,
      request: {
        ...(body && {
          body: {
            content: {
              'application/json': { schema: body },
            },
          },
        }),
        query: query as ZodObject<any>,
      },
      responses: {
        200: { description: 'Success' },
      },
    })
  })

  return new OpenApiGeneratorV3(registry.definitions).generateDocument(config)
}

export function registerRoute(meta: RegisteredRoute) {
  registeredRoutes.push(meta)
}
