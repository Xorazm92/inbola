"use client";

import CartItemLG from "@/components/cart/CartItemLG";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { TRANSACTION_FEE } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { items, removeItem } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  const { mutate: applyCoupon, isLoading: isApplying } =
    trpc.cart.applyCoupon.useMutation({
      onSuccess: ({ cart }) => {
        setDiscountPercent(cart.discount || 0);
      },
    });
  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      },
    });

  const { mutate: createCartList, isLoading: IsListCreating } =
    trpc.list.createList.useMutation({
      onSuccess: ({ listId }) => {
        router.push(`/list/${listId}`);
      },
    });

  const createList = async () =>
    createCartList({ productIds: items.map(({ product }) => product.id) });

  let subTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );

  const productIds = items.map(({ product }) => product.id);

  const { mutate: createClickInvoice, isLoading: clickLoading } =
    trpc.click.createInvoiceFromProducts.useMutation({
      onSuccess: ({ url }) => url && router.push(url),
    });
  const { mutate: createPaymeInvoice, isLoading: paymeLoading } =
    trpc.payme.createInvoiceFromProducts.useMutation({
      onSuccess: ({ url }) => url && router.push(url),
    });

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground/90 sm:text-4xl">
          Shopping Cart
        </h1>

        <p>
          Want to share the same products with everyone?
          <Button
            variant="link"
            size="sm"
            onClick={createList}
            disabled={IsListCreating}
          >
            Create a cart list
          </Button>
        </p>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed border-zinc-200 p-12":
                isMounted && items.length === 0,
            })}
          >
            <h2 className="sr-only">Items in your shopping cart</h2>

            {isMounted && items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="relative mb-4 h-40 w-40 text-muted-foreground"
                >
                  <Image
                    src="/empty-cart.png"
                    layout="fill"
                    alt="Empty Cart"
                    loading="eager"
                  />
                </div>
                <h3 className="font-semibold text-2xl">Your cart is empty</h3>
                <p className="text-muted-foreground text-center ">
                  Woops! Looks like you haven&apos;t added anything to your cart
                  yet.
                </p>
              </div>
            ) : null}

            <ul
              className={cn({
                "divide-y divide-foreground/20 text-foreground/20 border-b border-t border-foreground/20":
                  isMounted && items.length > 0,
              })}
            >
              {isMounted &&
                items.map(({ product }) => (
                  <CartItemLG
                    onClick={removeItem}
                    isEditable
                    key={product.id}
                    product={product}
                  />
                ))}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-foreground/5 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="font-medium text-foreground/90 text-lg">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-foreground/60">Subtotal</p>
                <p className="font-medium text-foreground/90 text-sm">
                  {isMounted ? (
                    formatPrice(subTotal)
                  ) : (
                    <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-foreground/20 text-foreground/20 pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Flat Transaction fees</span>
                </div>
                <div className="text-sm font-medium text-foreground/90">
                  {isMounted ? (
                    formatPrice(Number(TRANSACTION_FEE))
                  ) : (
                    <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
                  )}
                </div>
              </div>
              {discountPercent > 0 && (
                <div className="flex items-center justify-between border-t border-foreground/20 pt-4">
                  <span className="text-sm text-muted-foreground">Discount</span>
                  <span className="text-sm font-medium text-green-600">-{discountPercent}%</span>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-muted text-foreground/20 pt-4">
                <div className="flex items-center text-base font-medium text-muted-foreground">
                  Order Total
                </div>
                <div className=" text-base font-medium text-foreground/90">
                  {isMounted ? (
                    formatPrice(
                    subTotal * (1 - discountPercent / 100) +
                      Number(TRANSACTION_FEE)
                  )
                  ) : (
                    <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex">
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className="flex-1 px-3 py-2 rounded-l-md border border-r-0 bg-background text-sm"
                />
                <Button
                  variant="secondary"
                  disabled={!couponCode || isApplying}
                  onClick={() => applyCoupon({ code: couponCode })}
                  className="rounded-l-none"
                >
                  {isApplying && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
                  Apply
                </Button>
              </div>

              
              {isMounted && (
                <Button
                  disabled={items.length === 0 || isLoading}
                  onClick={() => createCheckoutSession({ productIds })}
                  className="w-full"
                  size="lg"
                >
                  {isLoading && (
                    <Loader2 className="h-5 w-5 animate-spin mr-1.5" />
                  )}
                  Checkout
                </Button>
              )}

              {isMounted && (
                <Button
                  variant="outline"
                  disabled={items.length === 0 || clickLoading}
                  onClick={() => createClickInvoice({ productIds, couponCode })}
                  className="w-full mt-2"
                >
                  {clickLoading && <Loader2 className="h-5 w-5 animate-spin mr-1.5" />}
                  Pay with Click
                </Button>
              )}
              {isMounted && (
                <Button
                  variant="outline"
                  disabled={items.length === 0 || paymeLoading}
                  onClick={() => createPaymeInvoice({ productIds, couponCode })}
                  className="w-full mt-2"
                >
                  {paymeLoading && <Loader2 className="h-5 w-5 animate-spin mr-1.5" />}
                  Pay with Payme
                </Button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
