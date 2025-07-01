import { router, publicProcedure } from "./trpc";
import { Product } from "../payload-types";
import { z } from "zod";
import { signPaymeRequest } from "@/lib/payme";
import { getPayloadClient } from "@/get-payload";

export const paymeRouter = router({
  createInvoiceFromProducts: publicProcedure
    .input(z.object({ productIds: z.array(z.string()), couponCode: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      const { productIds, couponCode } = input;
      const payload = await getPayloadClient();
      const { docs: products } = await payload.find({
        collection: "products",
        where: { id: { in: productIds } },
      });
      let total = products.reduce((sum: number, p: Product) => sum + p.price, 0);
      // coupon
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
      total = total * (1 - discountPercent / 100);
      const order = await payload.create({
        collection: "orders" as any,
        data: { _isPaid: false, products: productIds },
      });
      const sign = signPaymeRequest(order.id, total);
      const url = `${process.env.PAYME_BASE_URL}?merchant=${process.env.PAYME_MERCHANT_ID}&amount=${total * 100}&account[order_id]=${order.id}&sign=${sign}`;
      return { url };
    }),
  createInvoice: publicProcedure
    .input(z.object({ orderId: z.string(), amount: z.number() }))
    .mutation(async ({ input }) => {
      const { orderId, amount } = input;
      const sign = signPaymeRequest(orderId, amount);
      const url = `${process.env.PAYME_BASE_URL}?merchant=${process.env.PAYME_MERCHANT_ID}&amount=${amount * 100}&account[order_id]=${orderId}&sign=${sign}`;
      return { url };
    }),

  succeedCallback: publicProcedure
    .input(z.any())
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();
      await payload.update({
        collection: "orders" as any,
        id: input["account.order_id"],
        data: { _isPaid: true },
      });
      return { ok: true };
    }),

  cancelCallback: publicProcedure.input(z.any()).mutation(() => ({ ok: true })),
});
