/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/data-table";
import Pagination from "@/components/pagination";
import SearchBox from "@/components/search-box";
import SortBox from "@/components/sort-box";
import { PAGE_SIZE_OPTIONS, PRODUCT_SORT_MAP } from "@/lib/constants";
import { parseNumberFromQuery, parseStringFromQuery } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import { ProductNew } from "../product-new";
import { PRODUCT_TABLE_COLUMN } from "./product-table-column";

export default function ProductList() {
  const searchParams = useSearchParams();

  const page = parseNumberFromQuery(searchParams.get("page"), 1);
  const pageSize = parseNumberFromQuery(searchParams.get("pageSize"), 5);
  const search = parseStringFromQuery(searchParams.get("search"), "");
  const sortBy = parseStringFromQuery(
    searchParams.get("sortBy"),
    "-createdAt",
  ) as any;

  const { data, error, isFetching, isLoading } = api.product.getAll.useQuery({
    page,
    pageSize,
    search,
    sortBy,
  });

  return (
    <div className="mt-9 w-full space-y-6">
      <h3 className="font-serif text-xl font-semibold tracking-tight">
        All Products
      </h3>

      <div className="mb-6 flex w-full flex-col-reverse gap-3 md:flex-row md:justify-between md:gap-0">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <SortBox label="Sort product..." labelValueMap={PRODUCT_SORT_MAP} />
          <SearchBox placeholder="Search product..." />
        </div>

        <ProductNew />
      </div>

      <DataTable
        columns={PRODUCT_TABLE_COLUMN}
        data={data?.products ?? []}
        hasQuery={!!search}
        isLoading={isFetching || isLoading}
      />

      <Pagination
        className="mt-6"
        page={{
          current: data?.metadata.currentPage ?? page,
          total: data?.metadata.lastPage ?? page,
        }}
        pageSize={{
          current: data?.metadata.pageSize ?? pageSize,
          options: PAGE_SIZE_OPTIONS,
        }}
        totalRecord={data?.metadata.totalRecord ?? 0}
        isLoading={isFetching}
      />
    </div>
  );
}
