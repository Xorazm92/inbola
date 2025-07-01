import { router, publicProcedure } from "./trpc";
import { z } from "zod";
import { signClickRequest } from "@/lib/click";
import { getPayloadClient } from "@/get-payload";
import { Product } from "../payload-types";

export const clickRouter = router({
  createInvoiceFromProducts: publicProcedure
    .input(
      z.object({ productIds: z.array(z.string()), couponCode: z.string().optional() })
    )
    .mutation(async ({ input, ctx }) => {
      const { productIds, couponCode } = input;
      const payload = await getPayloadClient();

      const { docs: products } = await payload.find({
        collection: "products",
        where: { id: { in: productIds } },
      });
      const total = products.reduce((sum: number, p: Product) => sum + p.price, 0);
      // Apply coupon if provided
      let discountPercent = 0;
      if (couponCode) {
        const { docs: coupons } = await payload.find({
          collection: "coupons" as any,
          where: { code: { equals: couponCode.toUpperCase() }, active: { equals: true } },
        });
        const coupon = coupons[0];
        if (coupon && (!coupon.expiresAt || new Date(coupon.expiresAt) > new Date())) {
          if (coupon.type === "percent") discountPercent = coupon.value;
        }
      }
      const amount = total * (1 - discountPercent / 100);
      // Create order
      const order = await payload.create({
        collection: "orders" as any,
        data: {
          _isPaid: false,
          products: productIds,
          
        },
      });
      const sign = signClickRequest(order.id, amount);
      const url = `${process.env.CLICK_BASE_URL}?merchant_id=${process.env.CLICK_MERCHANT_ID}&amount=${amount}&transaction_param=${order.id}&sign=${sign}`;
      return { url };
    }),

  createInvoice: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        amount: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { orderId, amount } = input;
      const sign = signClickRequest(orderId, amount);
      const url = `${process.env.CLICK_BASE_URL}?merchant_id=${process.env.CLICK_MERCHANT_ID}&amount=${amount}&transaction_param=${orderId}&sign=${sign}`;
      return { url };
    }),

  succeedCallback: publicProcedure
    .input(z.any())
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();
      await payload.update({
        collection: "orders" as any,
        id: input.transaction_param,
        data: { _isPaid: true },
      });
      return { ok: true };
    }),

  cancelCallback: publicProcedure.input(z.any()).mutation(() => ({ ok: true })),
});
