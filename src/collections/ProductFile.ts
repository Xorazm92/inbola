import { CollectionConfig } from "payload/types";
import { Access } from "payload/types";
import { User } from "../payload-types";

// Using local storage instead of S3
const LOCAL_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

const isAdminOrHasAccessToProductFile = (): Access => {
  return async ({ req }) => {
    const user = req.user as User | undefined;

    if (!user) return false;
    if (user.role === "admin") return true;

    return {
      user: {
        equals: user.id,
      },
    };
  };
};

export const ProductFile: CollectionConfig = {
  slug: "product_files",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  hooks: {
    beforeOperation: [
      async ({ args, operation }) => {
        const files = args.req?.files;
        if (files && files.file && files.file.name && operation === "create") {
          const parts = files.file.name.split(".");
          files.file.name = `product_file-${(Math.random() + 1)
            .toString(36)
            .substring(2)}-${Math.random().toString(36).substring(2, 15)}.${
            parts[parts.length - 1]
          }`;
        }
      },
    ],
  },
  access: {
    create: isAdminOrHasAccessToProductFile(),
    read: isAdminOrHasAccessToProductFile(),
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  upload: {
    staticDir: "product_files",
    staticURL: "/product_files",
    disableLocalStorage: false, // Enable local storage
    adminThumbnail: ({ doc }) => {
      // Return a default thumbnail or the actual file URL
      return `${LOCAL_URL}/product_files/${doc.filename}`;
    },
    mimeTypes: [
      "image/*",
      "application/pdf",
      "application/zip",
      "application/x-rar-compressed",
      "application/x-7z-compressed",
      "application/x-tar",
      "application/x-gzip",
    ],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
  ],
};

export default ProductFile;
