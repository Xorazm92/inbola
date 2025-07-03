
import UzumHeader from "@/components/layout/UzumHeader";
import UzumLayout from "@/components/layout/UzumLayout";
import UzumHero from "@/components/home/UzumHeroFixed";
import DealsSection from "@/components/home/DealsSection";
import BrandsSection from "@/components/home/BrandsSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <>
      {/* Uzum Market Style Header */}
      <UzumHeader />

      {/* Uzum Market Layout with Sidebar */}
      <UzumLayout>
        {/* Uzum Market Style Hero */}
        <UzumHero />

        {/* Flash Deals - Uzum Market Style */}
        <DealsSection />

        {/* Featured Products - Uzum Market Style */}
        <FeaturedProducts />

        {/* Top Brands - Uzum Market Style */}
        <BrandsSection />
      </UzumLayout>
    </>
  );
}
