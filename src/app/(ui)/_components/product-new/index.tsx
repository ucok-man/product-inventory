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
import { Plus } from "lucide-react";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import NewProductForm from "./new-product-form";

export function ProductNew() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <Button className="min-w-28">
        <Plus /> <span>Add New</span>
      </Button>
    );
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="min-w-28">
            <Plus /> <span>Add New</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="mb-3">
            <DialogTitle className="flex items-center gap-1">
              <Plus className="text-primary" /> <span>Add Product</span>
            </DialogTitle>
            <DialogDescription>
              Create new product for inventory.
            </DialogDescription>
          </DialogHeader>

          <div>
            <NewProductForm onSuccess={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="min-w-28">
          <Plus /> <span>Add New</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[96vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex items-center justify-center gap-1">
            <Plus className="text-primary" /> <span>Add Product</span>
          </DrawerTitle>
          <DrawerDescription>
            Create new product for inventory.
          </DrawerDescription>
        </DrawerHeader>

        <div className="overflow-y-auto px-4">
          <NewProductForm onSuccess={() => setOpen(false)} />
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
