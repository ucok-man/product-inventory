/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "generated/prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ProductRemove from "../product-remove";
import { ProductUpdate } from "../product-update";

export const PRODUCT_TABLE_COLUMN: ColumnDef<Product>[] = [
  {
    header: "Product",
    size: 10,
    cell: ({ row }) => {
      return (
        <Link
          href={"#"}
          className="flex w-full items-center justify-start gap-2"
        >
          <div>
            <h3 className="line-clamp-1 truncate font-medium">
              {row.original.name}
            </h3>
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
        <div className="flex w-fit items-center justify-start">
          {formatCurrency(row.original.amount)}
        </div>
      );
    },
  },
  {
    header: "Qty",
    cell: ({ row }) => {
      return (
        <div className="flex w-fit items-center justify-start">
          {row.original.qty}
        </div>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const product = row.original;

      return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="space-y-1.5">
              <DropdownMenuItem asChild>
                <ProductUpdate product={product} />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <ProductRemove product={row.original} />
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
