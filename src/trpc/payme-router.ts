import { router, publicProcedure } from "./trpc";
import { z } from "zod";
import { signPaymeRequest } from "@/lib/payme";
import { getPayloadClient } from "@/get-payload";

export const paymeRouter = router({
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
