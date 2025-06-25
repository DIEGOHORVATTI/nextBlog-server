import { z, createSchemaBuilder } from '@/lib/create-schema-builder'

import type { RecoverPassword } from './dto'

export const recoverPasswordSchema = createSchemaBuilder<RecoverPassword>({
  email: () => z.string().email(),
})
