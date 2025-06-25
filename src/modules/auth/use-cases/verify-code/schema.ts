import { z, createSchemaBuilder } from '@/lib/create-schema-builder'

import type { VerifyCodeData } from './dto'

export const verifyCodeSchema = createSchemaBuilder<VerifyCodeData>({
  email: () => z.string().email(),
  code: () => z.string(),
})
