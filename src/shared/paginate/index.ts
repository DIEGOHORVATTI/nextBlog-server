export type PaginateOptions = {
  page?: number
  limit?: number
}

type PaginateResult<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export const paginate = async <T>(
  fetch: (skip: number, take: number) => Promise<[T[], number]>,
  { page = 1, limit = 20 }: PaginateOptions = {}
): Promise<PaginateResult<T>> => {
  const skip = (page - 1) * limit

  const [data, total] = await fetch(skip, limit)

  return {
    data,
    total,
    page,
    limit,
    hasMore: skip + data.length < total,
  }
}
