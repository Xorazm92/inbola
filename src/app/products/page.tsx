
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductSearch from "@/components/home/ProductSearch";
import ProductGrid from "@/components/product/ProductGrid";
import AliExpressProductGrid from "@/components/product/AliExpressProductGrid";
import { getPayloadClient } from "@/get-payload";
import { PRODUCT_CATEGORIES } from "@/lib/kids-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | INBOLA - Bolalar uchun marketplace",
  description: "Discover high-quality products for children of all ages. Shop clothing, toys, books and more.",
};

interface PageProps {
  searchParams: {
    category?: string;
    search?: string;
    page?: string;
    limit?: string;
  };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { category, search, page = "1", limit = "12" } = searchParams;

  // Get category info
  const categoryInfo = category
    ? PRODUCT_CATEGORIES.find(cat => cat.value === category)
    : null;
  
  const payload = await getPayloadClient();
  
  const whereClause: any = {
    approvedForSale: {
      equals: 'approved',
    },
  };

  if (category) {
    whereClause.category = {
      equals: category,
    };
  }

  if (search) {
    whereClause.or = [
      {
        name: {
          contains: search,
        },
      },
      {
        description: {
          contains: search,
        },
      },
    ];
  }

  try {
    const { docs: products, totalPages, page: currentPage } = await payload.find({
      collection: 'products',
      where: whereClause,
      limit: parseInt(limit),
      page: parseInt(page),
      depth: 1,
    });

    return (
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {categoryInfo ? categoryInfo.label : "Mahsulotlar"}
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            {categoryInfo
              ? `${categoryInfo.label} bo'limidagi eng yaxshi mahsulotlar`
              : "Bolalar uchun sifatli mahsulotlarni kashf eting"
            }
          </p>
          {search && (
            <p className="mt-2 text-sm text-muted-foreground">
              "{search}" uchun qidiruv natijalari
            </p>
          )}
        </div>

        <div className="mt-8">
          <ProductSearch />
        </div>

        <section className="mt-16">
          <AliExpressProductGrid
            products={products}
            title={categoryInfo ? categoryInfo.label : "Barcha mahsulotlar"}
            currentPage={currentPage || 1}
            totalPages={totalPages || 1}
          />
        </section>
      </MaxWidthWrapper>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center">
          <h1 className="text-4xl font-bold">Xatolik yuz berdi</h1>
          <p className="mt-4 text-muted-foreground">Mahsulotlarni yuklashda xatolik</p>
        </div>
      </MaxWidthWrapper>
    );
  }
}
