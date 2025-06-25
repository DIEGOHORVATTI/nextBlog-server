import { UserRole } from '@prisma/client'
import { z, createSchemaBuilder } from '@/lib/create-schema-builder'

import type { RegisterData } from './dto'

export const registerUserSchema = createSchemaBuilder<RegisterData>({
  email: () => z.string().email(),
  name: () => z.string().min(1).max(100),
  password: () => z.string().min(6).max(100),
  role: () => z.nativeEnum(UserRole),
})
