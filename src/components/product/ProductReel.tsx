
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { trpc } from "@/trpc/client";
import { PRODUCT_CATEGORIES } from "@/lib/kids-config";
import { TQueryValidator } from "@/lib/validators/query-validator";
import ProductListing from "./ProductListing";
import { useIntersectionObserver } from "@/hooks/use-performance";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
}

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href, query } = props;
  const [mounted, setMounted] = useState(false);

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: queryResults, isLoading } = trpc.products.useQuery(
    { 
      limit: query.limit ?? 4,
      query 
    },
    {
      enabled: mounted && isIntersecting,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000 // 10 minutes
    }
  );

  const products = queryResults?.items || [];

  let map: (typeof PRODUCT_CATEGORIES)[number][] = [];
  if (products.length > 0) {
    map = products.map((product) =>
      PRODUCT_CATEGORIES.find(({ value }) => value === product.category)!
    );
  }

  if (!mounted) {
    return (
      <section className="py-12" ref={ref}>
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

  return (
    <section className="py-12" ref={ref}>
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
            {products.map((product, i) => (
              <ProductListing key={`product-${i}`} product={product} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
