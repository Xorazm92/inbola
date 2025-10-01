"use client";
import dynamic from "next/dynamic";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_SUMMARY } from "./gql/Product";
import { useMemo } from "react";
import groupProductsByFlag from "./utils/groupProductsByFlag";
import SkeletonLoader from "./components/feedback/SkeletonLoader";

const HeroSection = dynamic(() => import("./(public)/(home)/HeroSection"), {
  ssr: false,
});
const CategoryBar = dynamic(() => import("./(public)/(home)/CategoryBar"), {
  ssr: false,
});
const ProductSection = dynamic(
  () => import("./(public)/product/ProductSection"),
  { ssr: false }
);
const MainLayout = dynamic(() => import("./components/templates/MainLayout"), {
  ssr: false,
});

const Home = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS_SUMMARY, {
    variables: { first: 100 },
    fetchPolicy: "no-cache",
  });

  const { featured, trending, newArrivals, bestSellers } = useMemo(() => {
    if (!data?.products?.products)
      return { featured: [], trending: [], newArrivals: [], bestSellers: [] };
    return groupProductsByFlag(data.products.products);
  }, [data]);

  if (loading) {
    return (
      <MainLayout>
        <HeroSection />
        <SkeletonLoader />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <HeroSection />
      <CategoryBar />
      <ProductSection
        title="Tavsiya Etilgan"
        products={featured}
        loading={false}
        error={error}
        showTitle={true}
      />
      <ProductSection
        title="Mashhur"
        products={trending}
        loading={false}
        error={error}
        showTitle={true}
      />
      <ProductSection
        title="Yangi Kelganlar"
        products={newArrivals}
        loading={false}
        error={error}
        showTitle={true}
      />
      <ProductSection
        title="Eng Ko'p Sotiladigan"
        products={bestSellers}
        loading={false}
        error={error}
        showTitle={true}
      />
    </MainLayout>
  );
};

export default Home;
