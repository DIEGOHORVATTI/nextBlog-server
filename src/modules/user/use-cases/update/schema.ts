import { UserRole } from '@prisma/client'
import { z, createSchemaBuilder } from '@/lib/create-schema-builder'

import type { UpdateUserDTO } from './dto'

export const updateUserSchema = createSchemaBuilder<UpdateUserDTO>({
  email: () => z.string().email().optional(),
  name: () => z.string().min(1).max(100).optional(),
  password: () => z.string().min(6).max(100).optional(),
  role: () => z.nativeEnum(UserRole).optional(),
})
