import {
  AuthCredentialValidator,
  ProfileUpdateValidator,
  ChangePasswordValidator
} from "../lib/validators/account-credentials-validator";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { cookies } from "next/headers";

export const authRouter = router({
  getUser: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;

    const payload = await getPayloadClient();
    const existingUser = await payload.findByID({
      collection: "users",
      id: user.id,
    });

    if (!existingUser) throw new TRPCError({ code: "NOT_FOUND" });
    return existingUser;
  }),
  createPayloadUser: publicProcedure
    .input(AuthCredentialValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayloadClient();

      // Check if user exists
      const { docs } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (docs.length > 0) throw new TRPCError({ code: "CONFLICT" });

      await payload.create({
        collection: "users",
        data: {
          email,
          password,
          role: "user",
        },
      });

      return { success: true, sentToEmail: email };
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;

      const payload = await getPayloadClient();

      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });

      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });

      return { success: true };
    }),

  signIn: publicProcedure
    .input(AuthCredentialValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;

      const payload = await getPayloadClient();

      try {
        const { token } = await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
        });

        cookies().set({
          name: "payload-token",
          value: token,
          httpOnly: true,
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          secure: process.env.NODE_ENV === 'production',
          path: "/",
        });

        return { success: true };
      } catch (e) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
  resetPassword: publicProcedure
    .input(
      z.object({
        token: z.string(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ input }) => {
      const { token, password } = input;

      const payload = await getPayloadClient();

      const { user } = await payload.resetPassword({
        collection: "users",
        overrideAccess: true,
        data: {
          token,
          password,
        },
      });

      if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });

      return { success: true, user };
    }),

  updateProfile: privateProcedure
    .input(ProfileUpdateValidator)
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx;
      const payload = await getPayloadClient();

      try {
        const updatedUser = await payload.update({
          collection: "users",
          id: user.id,
          data: input,
        });

        return { success: true, user: updatedUser };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update profile"
        });
      }
    }),

  changePassword: privateProcedure
    .input(ChangePasswordValidator)
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx;
      const { currentPassword, newPassword } = input;
      const payload = await getPayloadClient();

      try {
        // Verify current password
        await payload.login({
          collection: "users",
          data: {
            email: user.email,
            password: currentPassword,
          },
        });

        // Update password
        await payload.update({
          collection: "users",
          id: user.id,
          data: {
            password: newPassword,
          },
        });

        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Current password is incorrect"
        });
      }
    }),
});
