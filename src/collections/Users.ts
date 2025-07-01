import { AfterChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";
// import { PrimaryActionEmailHtml } from "../components/email/PrimaryActionEmail";

/**
 * Generates a simple HTML for primary action email (no JSX, no React)
 */
function generatePrimaryActionEmailHtml({ actionLabel, buttonText, href }: { actionLabel: string, buttonText: string, href: string }) {
  return `
    <html>
      <head></head>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width:480px;margin:0 auto;padding:24px 16px;">
          <img src="${process.env.NEXT_PUBLIC_SERVER_URL || ''}/logo.png" width="150" height="150" alt="DigiBee" style="display:block;margin:0 auto 24px;"/>
          <p style="font-size:16px;line-height:26px;">Hi there,</p>
          <p style="font-size:16px;line-height:26px;">Welcome to DigiBee, the marketplace for high quality digital goods. Use the button below to ${actionLabel}.</p>
          <div style="text-align:center;margin:24px 0;">
            <a href="${href}" style="background:#FACC15;color:#000;padding:12px 24px;border-radius:3px;text-decoration:none;font-size:16px;">${buttonText}</a>
          </div>
          <p style="font-size:16px;line-height:26px;">Best,<br/>The DigiBee team</p>
          <hr style="border-color:#ccc;margin:20px 0;"/>
          <p style="color:#8898aa;font-size:12px;">If you did not request this email, you can safely ignore it.</p>
        </div>
      </body>
    </html>
  `;
}

import { User } from "../payload-types";

const adminAndUserOnly: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;

  return {
    id: {
      equals: user.id,
    },
  };
};

const createCart: AfterChangeHook<User> = async ({ operation, req, doc }) => {
  if (operation === "create") {
    const cart = await req.payload.create({
      collection: "cart",
      data: {
        user: doc.id,
        products: [],
      },
    });

    await req.payload.update({
      collection: "users",
      id: doc.id,
      data: {
        cart: cart.id,
      },
    });
  }
};

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    forgotPassword: {
      generateEmailHTML: (arg) => {
        const token = arg?.token || "";

        return generatePrimaryActionEmailHtml({
          actionLabel: "reset your password",
          buttonText: "Reset Password",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}`,
        });
      },
    },
    verify: {
      generateEmailHTML: ({ token }) => {
        return generatePrimaryActionEmailHtml({
          actionLabel: "verify your account",
          buttonText: "Verify Account",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify?token=${token}`,
        });
      },
    },
  },
  access: {
    read: adminAndUserOnly,
    create: (): boolean => true,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  admin: {
    hidden: ({ user }) => user.role !== "admin",
    defaultColumns: ["id"],
  },
  // hooks: {
  //   afterChange: [createCart],
  // },
  fields: [
    {
      name: "loginAttempts",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: {
        hidden: true,
      },
    },
    {
      name: "lockUntil",
      type: "date",
      admin: {
        hidden: true,
      },
    },
    {
      name: "products",
      label: "Products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
    {
      name: "product_files",
      label: "Product Files",
      type: "relationship",
      relationTo: "product_files",
      admin: {
        condition: (): boolean => false,
      },
      hasMany: true,
    },
    {
      name: "role",
      required: true,
      defaultValue: "user",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
    {
      name: "cart",
      label: "Cart",
      type: "relationship",
      relationTo: "cart",
      hasMany: false,
    },
  ],
};

export default Users;
