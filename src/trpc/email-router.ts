import { router, privateProcedure } from "./trpc";
import { z } from "zod";
import { renderWelcome } from "@/emails/welcome";
import { renderOrderConfirmation } from "@/emails/order-confirmation";
import nodemailer from "nodemailer";
import { getPayloadClient } from "@/get-payload";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const emailRouter = router({
  sendWelcome: privateProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();
      const user = await payload.findByID({ collection: "users" as any, id: input.userId });
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Welcome to INBOLA",
        html: renderWelcome(user.email.split("@")[0]),
      });
      return { ok: true };
    }),

  sendOrderConfirmation: privateProcedure
    .input(z.object({ orderId: z.string() }))
    .mutation(async ({ input }) => {
      const payload = await getPayloadClient();
      const order = await payload.findByID({ collection: "orders" as any, id: input.orderId, depth: 2 });
      const html = renderOrderConfirmation(
        order.id,
        order.products as any,
        order.total || 0
      );

      const user = typeof order.user === "string" ? await payload.findByID({ collection: "users" as any, id: order.user }) : order.user;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: `Order #${order.id} Confirmation`,
        html,
      });
      return { ok: true };
    }),
});
