import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import express from 'express'
import { join } from 'node:path'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import userRouter from '@/modules/user/routes'
import authRouter from '@/modules/auth/routes'
import postRouter from '@/modules/post/routes'
import exception from '@/middlewares/exception'
import openApi from '@/lib/route-builder/lib/docs'
import commentRouter from '@/modules/comment/routes'
import timerToSeconds from '@/shared/timer-to-seconds'
import categoryRouter from '@/modules/category/routes'
import { PORT, VERSION, NODE_ENV, APP_NAME } from '@/constants/config'

import notFound from './middlewares/notFound'

const limiter = rateLimit({
  windowMs: timerToSeconds({ minutes: 15 }),
  max: 100,
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

const app = express()

app.use(
  helmet({
    contentSecurityPolicy:
      NODE_ENV === 'development'
        ? {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
              styleSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
              imgSrc: ["'self'", 'data:', 'https://cdn.jsdelivr.net'],
              connectSrc: ["'self'", 'https://cdn.jsdelivr.net'],
            },
          }
        : undefined,
  })
)
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'])
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(limiter)
app.use(cookieParser())
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

app.get('/', (_req, res) => {
  res.send('API is running 🚀')
})

app.get('/openapi.json', (_req, res) => {
  res.json(
    openApi({
      openapi: '3.1.0',
      info: {
        title: APP_NAME,
        version: VERSION,
      },
    })
  )
})

app.get('/docs', (_req, res) => {
  res.sendFile(join(__dirname, 'public/docs.html'))
})

app.use(authRouter)
app.use(userRouter)
app.use(categoryRouter)
app.use(commentRouter)
app.use(postRouter)

app.use(notFound)
app.use(exception)

app.listen(PORT, () => {
  console.log(`\n  Server is running at port http://localhost:${PORT}`)
})

export default app
