"use client";

import { DataTable } from "@/components/data-table";
import SearchBox from "@/components/search-box";
import SortBox from "@/components/sort-box";
import { PRODUCT_SORT_MAP } from "@/lib/constants";
import { PRODUCT_TABLE_COLUMN } from "./product-table-column";

export default function ProductList() {
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
        <DataTable columns={PRODUCT_TABLE_COLUMN} data={[]} isLoading={false} />
      </div>
    </div>
  );
}
