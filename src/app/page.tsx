
import EnhancedHeader from "@/components/layout/EnhancedHeader";
import EnhancedHeroSection from "@/components/sections/EnhancedHeroSection";
import DealsSection from "@/components/home/DealsSection";
import BrandsSection from "@/components/home/BrandsSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import EnhancedFooter from "@/components/layout/EnhancedFooter";
import AliExpressProductGrid from "@/components/product/AliExpressProductGrid";
import { getPayloadClient } from "@/get-payload";

export default async function Home() {
  // Fetch products for AliExpress style grid
  const payload = await getPayloadClient();

  let products = [];
  try {
    const { docs } = await payload.find({
      collection: 'products',
      where: {
        approvedForSale: {
          equals: 'approved',
        },
      },
      limit: 24, // Show 24 products in AliExpress style
      depth: 1,
    });
    products = docs;
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Enhanced Header */}
      <EnhancedHeader />

      {/* Enhanced Hero Section */}
      <EnhancedHeroSection />

      {/* Content Sections */}
      <div className="bg-white">
        {/* Flash Deals - Enhanced */}
        <DealsSection />

        {/* AliExpress Style Products Grid */}
        <section className="py-8 bg-gray-50">
          <AliExpressProductGrid
            products={products}
            title="Sizga tavsiya etiladigan mahsulotlar"
          />
        </section>

        {/* Featured Products - Enhanced */}
        <FeaturedProducts />

        {/* Top Brands - Enhanced */}
        <BrandsSection />
      </div>

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  );
}
