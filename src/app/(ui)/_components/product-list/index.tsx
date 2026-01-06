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
import { PRODUCT_TABLE_COLUMN } from "./product-table-column";

const DEFAULT_PAGE_SIZE = 5;

export default function ProductList() {
  const searchParams = useSearchParams();
  const { data, error, isFetching, isLoading } = api.product.getAll.useQuery({
    page: parseNumberFromQuery(searchParams.get("page"), 1),
    pageSize: parseNumberFromQuery(
      searchParams.get("pageSize"),
      DEFAULT_PAGE_SIZE,
    ),
    search: parseStringFromQuery(searchParams.get("search")),
    sortBy: parseStringFromQuery(searchParams.get("sortBy")) as any,
  });

  return (
    <div className="mt-9 w-full space-y-6">
      <h3 className="font-serif text-xl font-semibold tracking-tight">
        All Products
      </h3>

      <div>
        <div className="mb-6 flex w-full justify-between">
          <SearchBox placeholder="Search product..." />
          <SortBox label="Sort product..." labelValueMap={PRODUCT_SORT_MAP} />
        </div>

        <DataTable
          columns={PRODUCT_TABLE_COLUMN}
          data={data?.products ?? []}
          isLoading={isFetching || isLoading}
        />

        <Pagination
          pageSizeOption={PAGE_SIZE_OPTIONS}
          defaultPageSize={DEFAULT_PAGE_SIZE}
          totalCount={data?.metadata.totalRecord ?? 0}
          className="mt-6"
        />
      </div>
    </div>
  );
}
