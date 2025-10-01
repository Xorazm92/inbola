# Inbola - Premium Onlayn Do'kon

Bu [Next.js](https://nextjs.org) asosida qurilgan Inbola e-commerce platformasi.

## Boshlash

Avval development serverni ishga tushiring:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Brauzeringizda [http://localhost:3000](http://localhost:3000) manzilini oching.

Sahifani tahrirlash uchun `app/page.tsx` faylini o'zgartiring. Sahifa avtomatik yangilanadi.

## 🧪 Sinov

### **Test Akkauntlari**

Ma'lumotlar bazasini to'ldirgandan keyin (`cd ../server && npm run seed`), quyidagi test akkauntlaridan foydalaning:

| Role           | Email                    | Password      | Use Case            |
| -------------- | ------------------------ | ------------- | ------------------- |
| **Superadmin** | `superadmin@example.com` | `password123` | Full system access  |
| **Admin**      | `admin@example.com`      | `password123` | Product management  |
| **User**       | `user@example.com`       | `password123` | Shopping experience |

### **Testing Features**

1. **Sign In Page**: Visit `/sign-in` to see test account credentials
2. **Role-Based Access**: Test different permissions with each account
3. **Product Browsing**: Use the seeded "Smartphone X" product
4. **Cart & Checkout**: Test the complete shopping flow

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
