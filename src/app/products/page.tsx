import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/product/ProductReel";
import React from "react";
import { getLabel } from "@/lib/utils";

type Param = string | string[] | undefined;

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

export default async function ProductsPage(props: any) {
  const searchParams = props.searchParams;
  const parsedSort = parse(searchParams?.sort);
  const parsedCategory = parse(searchParams?.category);
  const label = getLabel(parsedCategory);

  return (
    <MaxWidthWrapper>
      <ProductReel
        title={label ?? "Browse high-quality assets"}
        query={{
          category: parsedCategory,
          limit: 40,
          sort: parsedSort === "DESC" || parsedSort === "ASC" ? parsedSort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
}
