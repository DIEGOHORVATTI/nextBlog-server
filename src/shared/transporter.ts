import nodemailer from 'nodemailer'
import { MAIL_HOST, MAIL_PORT, MAIL_PASSWORD, MAIL_USERNAME } from '@/constants/config'

export const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: MAIL_PORT === 465,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
})
