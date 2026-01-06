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
          className="group flex w-fit items-center justify-start gap-2"
        >
          <div>
            <h3 className="font-medium">{row.original.name}</h3>
            <p className="text-muted-foreground truncate">
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
        <Link
          href={"#"}
          className="group flex w-fit items-center justify-start gap-2"
        >
          {row.original.amount}
        </Link>
      );
    },
  },
  {
    header: "Qty",
    cell: ({ row }) => {
      return (
        <Link
          href={"#"}
          className="group flex w-fit items-center justify-start gap-2"
        >
          {row.original.qty}
        </Link>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      return (
        <Link
          href={"#"}
          className="group flex w-fit items-center justify-start gap-2"
        >
          {/* {row.original.qty} */}
        </Link>
      );
    },
  },
];
