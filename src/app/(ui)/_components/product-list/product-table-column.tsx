import { formatCurrency } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "generated/prisma/client";
import Link from "next/link";

export const PRODUCT_TABLE_COLUMN: ColumnDef<Product>[] = [
  {
    header: "Product",
    cell: ({ row }) => {
      return (
        <Link
          href={"#"}
          className="flex w-fit items-center justify-start gap-2"
        >
          <div>
            <h3 className="font-medium">{row.original.name}</h3>
            <p className="text-muted-foreground line-clamp-1 truncate">
              {row.original.description}
            </p>
          </div>
        </Link>
      );
    },
  },

  {
    header: "Price",
    cell: ({ row }) => {
      return (
        <div className="flex w-fit items-center justify-start gap-2">
          {formatCurrency(row.original.amount)}
        </div>
      );
    },
  },
  {
    header: "Qty",
    cell: ({ row }) => {
      return (
        <div className="flex w-fit items-center justify-start gap-2">
          {row.original.qty}
        </div>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      return (
        <Link
          href={"#"}
          className="flex w-fit items-center justify-start gap-2"
        >
          {/* {row.original.qty} */}
        </Link>
      );
    },
  },
];
