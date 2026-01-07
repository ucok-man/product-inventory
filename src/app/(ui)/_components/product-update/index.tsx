"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { Product } from "generated/prisma/client";
import { Pencil } from "lucide-react";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import UpdateProductForm from "./update-product-form";

export function ProductUpdate({ product }: { product: Product }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <Button variant="ghost" size="sm" className="w-full justify-start">
        <Pencil className="text-primary mr-2 size-4" /> Edit
      </Button>
    );
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Pencil className="text-primary mr-2 size-4" /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-3">
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="text-primary size-5" />
              <span>Edit Product</span>
            </DialogTitle>
            <DialogDescription>
              Edit this product from inventory.
            </DialogDescription>
          </DialogHeader>

          <div>
            <UpdateProductForm
              product={product}
              onSuccess={() => setOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Pencil className="text-primary mr-2 size-4" /> Edit
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[96vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex items-center justify-center gap-2">
            <Pencil className="text-primary size-5" />
            <span>Edit Product</span>
          </DrawerTitle>
          <DrawerDescription>
            Edit this product from inventory.
          </DrawerDescription>
        </DrawerHeader>

        <div className="overflow-y-auto px-4">
          <UpdateProductForm
            product={product}
            onSuccess={() => setOpen(false)}
          />
        </div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
