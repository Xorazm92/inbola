// Stripe server SDK import - must be used only in server-side code!
import Stripe from 'stripe';

if (typeof window !== "undefined") {
  throw new Error("Stripe server SDK must not be imported in the browser. Move all Stripe usage to API routes or server-only files.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});
