import timerToSeconds from '@/shared/timer-to-seconds'

// General
export { name as APP_NAME, version as VERSION } from '../../package.json'
export const PORT = process.env.PORT || '8000'
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const WEB_URL = process.env.WEB_URL || ''

// Code verification
export const CODE_EXPIRATION_TIME = timerToSeconds({
  minutes: Number(process.env.CODE_EXPIRATION_TIME) || 15,
})
export const HTTP_ONLY_COOKIE = true
export const SECURE_COOKIE = NODE_ENV === 'production'
export const SAME_SITE_COOKIE = 'lax'
export const MAX_ATTEMPTS = 5

export const EMAIL_CONTACT = process.env.EMAIL_CONTACT || ''

// Database
export const POSTGRES_URL = process.env.POSTGRES_URL || ''
export const POSTGRES_PRISMA_URL = process.env.POSTGRES_PRISMA_URL || ''
export const POSTGRES_URL_NON_POOLING = process.env.POSTGRES_URL_NON_POOLING || ''
export const POSTGRES_USER = process.env.POSTGRES_USER || ''
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || ''
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || ''
export const POSTGRES_HOST = process.env.POSTGRES_HOST || ''

// Supabase
export const SUPABASE_URL = process.env.SUPABASE_URL || ''
export const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET || ''
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
export const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
export const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''

// JWT
export const JWT_EXPIRES_IN_DAYS = process.env.JWT_EXPIRES_IN_DAYS || '7d'
export const JWT_SECRET = process.env.JWT_SECRET || ''
export const JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS256'

// Mail
export const MAIL_HOST = process.env.MAIL_HOST || ''
export const MAIL_PORT = Number(process.env.MAIL_PORT || 587)
export const MAIL_USERNAME = process.env.MAIL_USERNAME || ''
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD || ''
