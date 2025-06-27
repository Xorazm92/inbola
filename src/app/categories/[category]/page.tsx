import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/product/ProductReel";
import React from "react";
import { getLabel } from "@/lib/utils";
import { TQueryValidator } from "@/lib/validators/query-validator";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const CategoryPage = ({ params }: CategoryPageProps) => {
  const { category } = params;

  const query: TQueryValidator = {
    category,
    limit: 40,
    sort: "DESC",
  } as TQueryValidator;

  const label = getLabel(category);

  return (
    <MaxWidthWrapper>
      <ProductReel
        title={label ?? "Products"}
        subtitle={`All ${label?.toLowerCase() ?? ""} for kids`}
        query={query}
      />
    </MaxWidthWrapper>
  );
};

export default CategoryPage;
