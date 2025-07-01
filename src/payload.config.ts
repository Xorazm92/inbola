import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import dotenv from "dotenv";
import path from "path";
import { buildConfig } from "payload/config";
import {
  Cart,
  Media,
  Orders,
  ProductFiles,
  Products,
  Users,
  List,
  Coupons,
} from "./collections";
import { S3Client } from "@aws-sdk/client-s3";
// Temporarily commenting out s3-upload as it's not installed
// import s3Upload from "payload-s3-upload";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users, Products, Media, ProductFiles, Orders, Cart, List, Coupons],
  routes: {
    admin: "/sell",
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: " | INBOLA - Bolalar uchun marketplace",
      favicon: "/favicon.ico",
      ogImage: "/logo.png",
    },
    css: path.resolve(__dirname, "../public/admin.css"),
  },
  rateLimit: {
    max: 2000,
    trustProxy: true,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
    connectOptions: {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  }),
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL!, 
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ],
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL!, 
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  plugins: [],
  email: {
    fromName: process.env.EMAIL_NAME || 'Inbola',
    fromAddress: process.env.EMAIL_FROM || 'info@inbola.uz',
    logMockCredentials: process.env.NODE_ENV === 'development',
    transport: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  },
});