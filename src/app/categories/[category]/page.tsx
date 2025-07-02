
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductGrid from "@/components/product/ProductGrid";
import { getPayloadClient } from "@/get-payload";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const CATEGORY_MAP = {
  clothing: "Kiyim",
  toys: "O'yinchoqlar", 
  books: "Kitoblar",
  school_supplies: "Maktab jihozlari"
};

interface PageProps {
  params: {
    category: string;
  };
  searchParams: {
    page?: string;
    limit?: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const categoryName = CATEGORY_MAP[params.category as keyof typeof CATEGORY_MAP];
  
  if (!categoryName) {
    return {
      title: "Kategoriya topilmadi",
    };
  }

  return {
    title: `${categoryName} | INBOLA`,
    description: `${categoryName} bo'limidagi eng yaxshi mahsulotlar`,
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = params;
  const { page = "1", limit = "12" } = searchParams;
  
  const categoryName = CATEGORY_MAP[category as keyof typeof CATEGORY_MAP];
  
  if (!categoryName) {
    notFound();
  }

  const payload = await getPayloadClient();

  try {
    const { docs: products, totalPages, page: currentPage } = await payload.find({
      collection: 'products',
      where: {
        and: [
          {
            approvedForSale: {
              equals: 'approved',
            },
          },
          {
            category: {
              equals: category,
            },
          },
        ],
      },
      limit: parseInt(limit),
      page: parseInt(page),
      depth: 1,
    });

    return (
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {categoryName}
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            {categoryName} bo'limidagi eng yaxshi mahsulotlar
          </p>
        </div>

        <section className="mt-16">
          <ProductGrid 
            products={products}
            title={categoryName}
            currentPage={currentPage || 1}
            totalPages={totalPages || 1}
          />
        </section>
      </MaxWidthWrapper>
    );
  } catch (error) {
    console.error('Error fetching category products:', error);
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

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((category) => ({
    category,
  }));
}
