"use client";

import { DataTable } from "@/components/data-table";
import { PRODUCT_TABLE_COLUMN } from "./product-table-column";

export default function ProductList() {
  return (
    <div className="mt-9 w-full space-y-3">
      <h3 className="font-serif text-xl font-semibold tracking-tight">
        All Products
      </h3>

      <DataTable columns={PRODUCT_TABLE_COLUMN} data={[]} isLoading={false} />
    </div>
  );
}
