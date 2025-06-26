"use client";

import { PRODUCT_CATEGORIES } from "@/lib/kids-config";
import Link from "next/link";
import Image from "next/image";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const CategoryGrid = () => {
  return (
    <section className="py-16">
      <MaxWidthWrapper>
        <h2 className="mb-8 text-2xl font-bold text-center text-foreground sm:text-3xl">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
          {PRODUCT_CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/list/${cat.value}`}
              className="relative block overflow-hidden rounded-lg group"
            >
              <Image
                src={`/nav/${cat.value}.jpg`}
                alt={cat.label}
                width={500}
                height={500}
                className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-80"
              />
              <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-foreground drop-shadow-lg">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default CategoryGrid;
