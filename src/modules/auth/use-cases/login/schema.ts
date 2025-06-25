import { z, createSchemaBuilder } from '@/lib/create-schema-builder'

import type { LoginData } from './dto'

export const loginSchema = createSchemaBuilder<LoginData>({
  email: () => z.string().email(),
  password: () => z.string().min(6).max(100),
})
