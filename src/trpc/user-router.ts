import { 
  ProfileUpdateValidator,
  ChangePasswordValidator 
} from "../lib/validators/account-credentials-validator";
import { privateProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
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

  getProfile: privateProcedure
    .query(async ({ ctx }) => {
      const { user } = ctx;
      const payload = await getPayloadClient();

      try {
        const userProfile = await payload.findByID({
          collection: "users",
          id: user.id,
        });

        return userProfile;
      } catch (error) {
        throw new TRPCError({ 
          code: "NOT_FOUND",
          message: "User profile not found"
        });
      }
    }),

  deleteAccount: privateProcedure
    .mutation(async ({ ctx }) => {
      const { user } = ctx;
      const payload = await getPayloadClient();

      try {
        await payload.delete({
          collection: "users",
          id: user.id,
        });

        return { success: true };
      } catch (error) {
        throw new TRPCError({ 
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete account"
        });
      }
    }),
});
