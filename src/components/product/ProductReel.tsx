
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { trpc } from "@/trpc/client";
import { PRODUCT_CATEGORIES } from "@/lib/kids-config";
import { TQueryValidator } from "@/lib/validators/query-validator";
import ProductListing from "./ProductListing";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
}

interface Product {
  id: string;
  category: string;
  [key: string]: unknown;
}

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href, query } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: queryResults, isLoading, error } = trpc.products.useQuery(
    {
      limit: query.limit ?? 4,
      query
    },
    {
      enabled: mounted,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: 1000,
    }
  );

  const products = (queryResults?.items || []) as Product[];

  if (!mounted) {
    return (
      <section className="py-12">
        <div className="md:flex md:items-center md:justify-between mb-4">
          <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {href && (
            <Link
              href={href}
              className="hidden text-sm font-medium text-primary hover:text-primary/80 md:block"
            >
              Shop the collection
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductListing key={i} product={null} index={i} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">Something went wrong</h2>
          <p className="text-gray-600">Unable to load products. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {href && (
          <Link
            href={href}
            className="hidden text-sm font-medium text-primary hover:text-primary/80 md:block"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        )}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <ProductListing key={`loading-${i}`} product={null} index={i} />
              ))
            ) : (
              products.map((product, i) => (
                <ProductListing key={`product-${product.id || i}`} product={product} index={i} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
