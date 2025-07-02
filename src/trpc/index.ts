import QueryValidator from "../lib/validators/query-validator";
import { authRouter } from "./auth-router";
import { userRouter } from "./user-router";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { getPayloadClient } from "../get-payload";
import { paymentRouter } from "./payment-router";
import { cartRouter } from "./cart-route";
import { listRouter } from "./list-route";
import { clickRouter } from "./click-router";
import { paymeRouter } from "./payme-router";
import { emailRouter } from "./email-router";

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  payment: paymentRouter,
  cart: cartRouter,
  list: listRouter,
  click: clickRouter,
  payme: paymeRouter,
  email: emailRouter,
  products: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { sort, limit, ...queryOpts } = query;

      const payload = await getPayloadClient();

      const parsedQueryOpts: Record<string, { equals: string }> = {};

      if (query.category) {
        parsedQueryOpts.category = {
          equals: query.category,
        };
      }

      const page = cursor || 1;

      const {
        docs: products,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "products",
        where: {
          approvedForSale: {
            equals: "approved",
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      });

      return {
        items: products,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});

export type AppRouter = typeof appRouter;
