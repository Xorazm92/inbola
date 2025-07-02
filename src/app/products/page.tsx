
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductSearch from "@/components/home/ProductSearch";
import ProductGrid from "@/components/product/ProductGrid";
import { getPayloadClient } from "@/get-payload";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | INBOLA - Bolalar uchun marketplace",
  description: "Discover high-quality products for children of all ages. Shop clothing, toys, books and more.",
};

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const payload = await getPayloadClient();
  
  // Get initial products for SEO and faster initial load
  const { docs: initialProducts } = await payload.find({
    collection: 'products',
    where: {
      approvedForSale: { equals: 'approved' },
      inStock: { equals: true }
    },
    sort: '-createdAt',
    limit: 12,
    depth: 2
  });

  return (
    <MaxWidthWrapper>
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Browse our curated collection of high-quality products for children. 
            From educational toys to stylish clothing, find everything you need.
          </p>
        </div>

        <ProductSearch />
        <ProductGrid initialProducts={initialProducts} />
      </div>
    </MaxWidthWrapper>
  );
}
