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
      titleSuffix: " | INBOLA",
      favicon: "/favicon.ico",
      ogImage: "/logo.png",
    },
  },
  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  cors: [process.env.NEXT_PUBLIC_SERVER_URL!, 'http://localhost:3000'],

  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  // S3 upload is disabled for now
  plugins: [],
});
