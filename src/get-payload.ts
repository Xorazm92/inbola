import payload from 'payload'
import { InitOptions } from 'payload/config'
import { Config } from './payload-types'
import nodemailer from 'nodemailer'
import path from 'path'
import config from './payload.config'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') })

let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null }
}

export const getPayloadClient = async () => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is missing')
  }

  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    // Configure nodemailer for local development
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    cached.promise = payload.init({
      config: config,
      email: {
        transport: transporter,
        fromAddress: process.env.EMAIL_FROM || 'info@inbola.uz',
        fromName: process.env.EMAIL_NAME || 'Inbola',
      },
      secret: process.env.PAYLOAD_SECRET,
      local: true,
    })
  }

  try {
    cached.client = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.client
}