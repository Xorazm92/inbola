import { router, publicProcedure } from "./trpc";
import { z } from "zod";
import { signClickRequest } from "@/lib/click";
import { getPayloadClient } from "@/get-payload";

export const clickRouter = router({
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
