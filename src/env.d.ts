import type { StringValue } from 'ms'

export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // string(development | production), example: development
      NODE_ENV: 'development' | 'production'

      // General configuration
      PORT: number
      WEB_URL: string
      EMAIL_CONTACT: string

      // JWT secret
      JWT_SECRET: string
      JWT_ALGORITHM: string
      JWT_EXPIRES_IN_DAYS: StringValue

      // JWT refresh token
      JWT_REFRESH_SECRET: string
      JWT_REFRESH_EXPIRES_IN_DAYS: number

      POSTGRES_URL: string
      POSTGRES_USER: string
      POSTGRES_HOST: string
      POSTGRES_PASSWORD: string
      POSTGRES_DATABASE: string
      POSTGRES_PRISMA_URL: string
      POSTGRES_URL_NON_POOLING: string
      SUPABASE_URL: string
      SUPABASE_JWT_SECRET: string
      SUPABASE_SERVICE_ROLE_KEY: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string
      NEXT_PUBLIC_SUPABASE_URL: string

      // Mail configuration
      MAIL_HOST: string
      MAIL_PASSWORD: string
      MAIL_USERNAME: string
      MAIL_PORT: number
    }
  }
}
