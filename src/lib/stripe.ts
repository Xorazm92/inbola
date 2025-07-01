// Stripe server SDK import - must be used only in server-side code!
import Stripe from 'stripe';

if (typeof window !== "undefined") {
  throw new Error("Stripe server SDK must not be imported in the browser. Move all Stripe usage to API routes or server-only files.");
}

let stripeInstance: Stripe | null = null;

if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
  stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
    typescript: true,
  });
}

// Fallback dummy implementation to satisfy TypeScript when Stripe is disabled
const disabledStripe = {
  checkout: {
    sessions: {
      create: async () => {
        throw new Error("Stripe is disabled. Provide STRIPE_SECRET_KEY to enable it.");
      },
    },
  },
  coupons: {
    create: async () => {
      throw new Error("Stripe is disabled. Provide STRIPE_SECRET_KEY to enable it.");
    },
  },
} as unknown as Stripe;

export const stripe = stripeInstance ?? disabledStripe;
