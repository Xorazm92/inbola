
import AddToCartButton from "@/components/cart/AddToCartButton";
import ProductImageSlider from "@/components/product/ProductImageSlider";
import ProductReel from "@/components/product/ProductReel";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getPayloadClient } from "@/get-payload";
import { formatPrice, getValidURLs } from "@/lib/utils";
import { Check, Shield, Star, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { Product } from "@/payload-types";

interface PageProps {
  params: {
    productId: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productId } = params;
  const payload = await getPayloadClient();

  try {
    const product = await payload.findByID({
      collection: 'products',
      id: productId,
      depth: 1
    });

    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The product you are looking for does not exist.'
      };
    }

    return {
      title: `${product.name} | INBOLA`,
      description: product.description || `${product.name} - Premium quality product for children`,
      keywords: product.seo?.keywords?.join(', ') || product.name,
      openGraph: {
        title: product.seo?.title || product.name,
        description: product.seo?.description || product.description,
        images: product.images?.length ? [
          {
            url: (product.images[0].image as any)?.url || '/placeholder.png',
            width: 800,
            height: 600,
            alt: product.name
          }
        ] : []
      }
    };
  } catch (error) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.'
    };
  }
}

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
];

const ProductPage = async ({ params }: PageProps) => {
  const { productId } = params;
  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: "approved",
      },
    },
    depth: 2,
  });

  const [product] = products;

  if (!product) return notFound();

  const validURLs = getValidURLs(product, 'media');

  // Get related products
  const { docs: relatedProducts } = await payload.find({
    collection: 'products',
    where: {
      and: [
        {
          category: { equals: product.category }
        },
        {
          id: { not_equals: product.id }
        },
        {
          approvedForSale: { equals: 'approved' }
        }
      ]
    },
    limit: 4,
    depth: 2
  });

  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product Details */}
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrumb.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="m5.555 17.776 8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <section className="mt-4">
              <div className="flex items-center">
                <p className="font-medium text-gray-900">
                  {formatPrice(product.price)}
                </p>

                <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating || 0)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm">
                      {product.rating || 0} / 5
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {product.description}
                </p>
              </div>

              {/* Product Attributes */}
              {(product.size?.length || product.color?.length || product.ageGroup) && (
                <div className="mt-6 space-y-4">
                  {product.size?.length && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">
                        Available Sizes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {// eslint-disable-next-line @typescript-eslint/no-explicit-any
product.size.map((size: any) => (
                          <Badge key={size} variant="outline">
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.color?.length && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">
                        Available Colors
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {// eslint-disable-next-line @typescript-eslint/no-explicit-any
product.color.map((color: any) => (
                          <Badge key={color} variant="outline">
                            {color}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.ageGroup && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">
                        Age Group
                      </h3>
                      <Badge variant="secondary">{product.ageGroup}</Badge>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 flex items-center">
                <Check
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                />
                <p className="ml-2 text-sm text-muted-foreground">
                  {product.inStock ? 'In stock and ready to ship' : 'Out of stock'}
                </p>
              </div>
            </section>
          </div>

          {/* Product images */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-lg">
              <ProductImageSlider urls={validURLs} />
            </div>
          </div>

          {/* add to cart part */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div className="mt-10">
                <AddToCartButton product={product} />
              </div>

              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm font-medium">
                  <Shield
                    aria-hidden="true"
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                  <span className="text-muted-foreground group-hover:text-gray-700">
                    30 Day Return Guarantee
                  </span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 space-y-4 border-t pt-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 mr-2" />
                  Free shipping on orders over $50
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  30-day return policy
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 mr-2" />
                  2-year warranty included
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <ProductReel
          href="/products"
          query={{ category: product.category, limit: 4 }}
          title={`Similar ${product.category}`}
          subtitle={`Browse similar high-quality ${product.category} just like '${product.name}'`}
        />
      )}
    </MaxWidthWrapper>
  );
};

export default ProductPage;
