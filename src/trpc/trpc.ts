import { User } from "@/payload-types";
import { Context } from "./context";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.context<Context>().create();
const middleware = t.middleware;

const isAuth = middleware(async ({ ctx, next }) => {
  const { user } = ctx;

  if (!user || !user.id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      user,
    },
  });
});

export const router = t.router;

export const publicProcedure = t.procedure;

export const privateProcedure = t.procedure.use(isAuth);
