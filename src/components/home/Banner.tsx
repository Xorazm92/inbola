"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";

const Banner = () => {
  return (
    <div className="relative w-full bg-primary/10">
      {/* Background illustration */}
      <Image
        src="/banner-kids.jpg"
        alt="Kids store banner"
        fill
        sizes="100vw"
        priority
        className="object-cover object-center opacity-30"
      />

      <MaxWidthWrapper>
        <div className="relative flex flex-col items-center justify-center h-[320px] py-12 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground/90 sm:text-5xl [text-wrap:balance]">
            New season, new fun!
          </h2>
          <p className="max-w-xl mt-4 text-lg text-muted-foreground">
            Discover colourful clothing, educational toys and much more for all
            age groups.
          </p>
          <Link href="/products" className={`${buttonVariants()} mt-6`}>
            Start Shopping
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Banner;