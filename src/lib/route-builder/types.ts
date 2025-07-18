import type { z, ZodSchema } from 'zod'
import type { Router, Request, Response, NextFunction, RequestHandler } from 'express'

export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'

// TODO: Name not implemented
export type Group = Partial<Pick<RouteConfig, 'prefix' | 'tags'>>

export type RouteConfig = {
  /**
   * @description Nome do grupo de rotas, usado para identificação e documentação.
   * @example
   * name: 'User Routes'
   */
  name: string

  /**
   * @description Prefix é um caminho que será adicionado ao início de todas as rotas dentro deste grupo.
   * Por exemplo, se o prefixo for '/api', todas as rotas dentro deste grupo terão '/api' adicionado ao início de seus caminhos.
   * @example
   * group('/api') => '/api/users', '/api/products'
   */
  prefix: string

  /**
   * @description Tags são usadas para categorizar as rotas, facilitando a organização e a documentação da API.
   * @example
   * tags: ['Auth', 'User']
   */
  tags: Array<string>

  /**
   * @description Router é a instância do roteador Express onde as rotas serão registradas.
   * @example
   * router: Router()
   */
  router: ReturnType<typeof Router>

  /**
   * @description Middlewares são funções que serão executadas antes do handler da rota.
   * Podem ser usadas para injetar dependências, validar dados ou realizar autenticação.
   * @example
   * middlewares: [authMiddleware]
   */
  middlewares: RequestHandler[]
}

export type TypedMiddleware<Ext extends Record<string, unknown> = {}> = {
  /**
   * @description Função middleware que será executada antes do handler da rota.
   * Pode ser usada para injetar dependências, validar dados ou realizar autenticação.
   * @param req - Requisição Express com extensões adicionais.
   * @param res - Resposta Express.
   * @param next - Função para passar o controle para o próximo middleware ou handler.
   * @returns Pode retornar uma Promise ou um valor síncrono. Se retornar uma Promise,
   *          o próximo middleware só será chamado quando a Promise for resolvida.
   */
  middleware: (req: Request & Ext, res: Response, next: NextFunction) => unknown

  /**
   * @description Função que será chamada para injetar dependências no contexto do handler da rota.
   * Pode ser usada para adicionar propriedades ao objeto de requisição.
   * @param req - Requisição Express com extensões adicionais.
   * @returns Um objeto com as extensões a serem injetadas no contexto do handler.
   */
  inject?: (req: Request & Ext) => Ext
}

type ExtractParams<Path extends string> = string extends Path
  ? Record<string, string>
  : Path extends `${infer _}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractParams<`/${Rest}`>]: string }
    : Path extends `${infer _}:${infer Param}`
      ? { [K in Param]: string }
      : {}

type InferBody<T extends ZodSchema<unknown> | undefined> =
  T extends ZodSchema<unknown> ? z.infer<T> : unknown

export type RouteMeta<
  Path extends string,
  BodySchema extends ZodSchema<unknown> | undefined,
  Query extends ZodSchema<unknown> | undefined,
> = {
  Path: Path
  Params: ExtractParams<Path>
  Body: InferBody<BodySchema>
  Query: InferBody<Query>
}

type OptionalZodSchema = ZodSchema<unknown> | undefined

export type RouteOptions<
  BodySchema extends OptionalZodSchema = undefined,
  QuerySchema extends OptionalZodSchema = undefined,
> = Partial<{
  body: BodySchema
  query: QuerySchema
  tags: Array<string>
  summary: string
  prefix: string
  description: string
}>

type Handler<Ext, Body, Params, Query> = (
  ctx: Ext & {
    body: Body
    params: Params
    query: Query
  },
  res: Response
) => Promise<unknown> | unknown

type BaseRoute<Ext, ExtraArgs extends any[] = []> = <
  Path extends string,
  BodySchema extends ZodSchema,
  Query extends ZodSchema,
>(
  ...args: [
    ...ExtraArgs,
    Path,
    Handler<
      Ext,
      RouteMeta<Path, BodySchema, Query>['Body'],
      RouteMeta<Path, BodySchema, Query>['Params'],
      RouteMeta<Path, BodySchema, Query>['Query']
    >,
    RouteOptions<BodySchema, Query>?,
  ]
) => void

export type RouteMethod<Ext> = BaseRoute<Ext>

export type RegisterFunction<Ext> = BaseRoute<Ext, [Method]>
