import { z, createSchemaBuilder } from '@/lib/create-schema-builder'

import type { ResetPasswordData } from './dto'

export const resetPasswordSchema = createSchemaBuilder<ResetPasswordData>({
  email: () => z.string().email(),
  newPassword: () => z.string().min(8),
  code: () => z.string(),
})
