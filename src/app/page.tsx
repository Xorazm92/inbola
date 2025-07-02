
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Banner from "@/components/home/Banner";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ProductReel from "@/components/product/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { ShieldCheck, ScanEye, Leaf, Truck, CreditCard, Headphones } from "lucide-react";
import Link from "next/link";

const features = [
  {
    name: "Tez yetkazib berish",
    Icon: Truck,
    description: "24 soat ichida bepul yetkazib berish xizmati mavjud."
  },
  {
    name: "Xavfsiz to'lov",
    Icon: CreditCard,
    description: "Barcha to'lov turlari himoyalangan va xavfsiz."
  },
  {
    name: "24/7 yordam",
    Icon: Headphones,
    description: "Har qanday savolingizga tez javob beramiz."
  },
  {
    name: "Sifat kafolati",
    Icon: ShieldCheck,
    description: "Barcha mahsulotlar sifat tekshiruvidan o'tgan."
  }
];

export default function Home() {
  return (
    <>
      <Banner />
      
      <MaxWidthWrapper>
        {/* Hero Section */}
        <div className="flex flex-col items-center max-w-4xl py-20 mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl [text-wrap:balance]">
            Bolalar uchun eng yaxshi{" "}
            <span className="text-primary">marketplace</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-prose [text-wrap:balance]">
            INBOLA platformasida sifatli va xavfsiz mahsulotlarni toping. 
            Har bir mahsulot ehtiyotkorlik bilan tanlab olingan.
          </p>

          <div className="flex flex-col gap-4 mt-8 md:flex-row">
            <Link href="/products" className={buttonVariants({ size: "lg" })}>
              Xarid qilishni boshlash
            </Link>
            <Button variant="outline" size="lg">
              Bizning kafolatimiz &rarr;
            </Button>
          </div>
        </div>

        {/* Features */}
        <section className="py-16 border-t border-gray-200 bg-gray-50 rounded-2xl my-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Nima uchun bizni tanlash kerak?
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Biz bolalar va ota-onalar uchun eng yaxshi xarid tajribasini taqdim etamiz
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                {features.map((feature) => (
                  <div key={feature.name} className="flex flex-col items-center text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-primary">
                      <feature.Icon className="h-8 w-8 text-white" aria-hidden="true" />
                    </div>
                    <dt className="text-lg font-semibold leading-7 text-gray-900">
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </MaxWidthWrapper>

      {/* Categories */}
      <CategoryGrid />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Product Reels */}
      <section className="bg-gray-50 py-16">
        <MaxWidthWrapper>
          <ProductReel
            query={{ sort: "DESC", limit: 4 }}
            href="/products?sort=recent"
            title="Yangi mahsulotlar"
            subtitle="Eng so'nggi qo'shilgan mahsulotlar"
          />
        </MaxWidthWrapper>
      </section>

      <section className="py-16">
        <MaxWidthWrapper>
          <ProductReel
            query={{ sort: "DESC", limit: 4 }}
            href="/products"
            title="Mashhur mahsulotlar"
            subtitle="Eng ko'p sotilayotgan mahsulotlar"
          />
        </MaxWidthWrapper>
      </section>
    </>
  );
}
