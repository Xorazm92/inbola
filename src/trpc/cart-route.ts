import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getPayloadClient } from "../get-payload";
import { privateProcedure, router } from "./trpc";

export const cartRouter = router({
  /**
   * getCart - Gets the user's cart
   * @returns - cart: Cart - The user's cart
   */

  getCart: privateProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx;

    const payload = await getPayloadClient();

    // Check if user has a cart
    let cart = await payload.findByID({
      collection: "cart" as any,
      id: (typeof user.cart === "string" ? user.cart : user?.cart?.id) || "",
    });

    return { cart, success: true, message: "Cart Updated" };
  }),

  /**
   * addItemsToCart - Adds products to the user's cart if they exist
   * @param - productId: string - The ID of the product to add to the cart
   * @returns - success: boolean - Whether or not the operation was successful
   * @returns - message: string - A message describing the outcome of the operation
   */
  addItemsToCart: privateProcedure
    .input(z.object({ productIds: z.array(z.string()) }))
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx;
      const { productIds } = input;

      const payload = await getPayloadClient();

      const { docs: products } = await payload.find({
        collection: "products",
        where: {
          id: {
            in: productIds,
          },
        },
      });

      if (!products || products.length !== productIds.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Some Product(s) were not found",
        });
      }

      // Check if user has a cart
      if (!user.cart) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Cart not found",
        });
      }

      const cart = await payload.findByID({
        collection: "cart" as any,
        id: typeof user.cart === "string" ? user.cart : user?.cart.id,
      });

      let allProductIds =
        cart?.products?.map((product: any) =>
          typeof product === "string" ? product : product.id
        ) || [];

      // If user has a cart, add the product to the cart
      const { docs } = await payload.update({
        collection: "cart" as any,
        where: {
          user: {
            equals: user.id,
          },
        },
        data: {
          products: Array.from(new Set([...allProductIds, ...productIds])),
        },
      });

      return { success: true, message: "Cart Updated", updatedCart: docs[0] };
    }),
  /**
   * removeItemFromCart - Removes a product from the user's cart
   * @param - productId: string - The ID of the product to remove from the cart
   * @returns - success: boolean - Whether or not the operation was successful
   */

  applyCoupon: privateProcedure
    .input(z.object({ code: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx;
      const { code } = input;

      const payload = await getPayloadClient();

      const { docs: coupons } = await payload.find({
        collection: "coupons" as any as any,
        where: {
          code: { equals: code.toUpperCase() },
          active: { equals: true },
        },
        limit: 1,
      });

      if (!coupons.length) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Invalid coupon" });
      }

      const coupon = coupons[0];

      if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Coupon expired" });
      }

      if (!user.cart) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Cart not found" });
      }

      const updated = await payload.update({
        collection: "cart" as any,
        id: typeof user.cart === "string" ? user.cart : user.cart.id,
        data: {
          coupon: coupon.id,
          discount: coupon.type === "percent" ? coupon.value : 0,
        },
      });

      return { success: true, cart: updated };
    }),

  removeItemFromCart: privateProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx;
      const { productId } = input;

      const payload = await getPayloadClient();

      // Check if product exists
      const product = await payload.findByID({
        collection: "products",
        id: productId,
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      if (!user.cart) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Cart not found" });
      }

      const cart = await payload.findByID({
        collection: "cart" as any,
        id: typeof user.cart === "string" ? user.cart : user.cart.id,
      });

      // If user has a cart, remove the product from the cart
      const updatedCart = await payload.update({
        collection: "cart" as any,
        id: cart.id,
        data: {
          products: cart.products?.filter(
            (product: any) =>
              (typeof product === "string" ? product : product.id) !== productId
          ),
        },
      });

      return { success: true, message: "Cart Updated", updatedCart };
    }),
});
