"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import type { Product } from "generated/prisma/client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  product: Product;
};

export default function ProductRemove({ product }: Props) {
  const [open, setOpen] = useState(false);

  const utils = api.useUtils();
  const { mutate, isPending } = api.product.delete.useMutation({
    onError: () => {
      toast.error("Oops!", {
        description: "Failed to remove product. Please try again!",
      });
    },
    onSuccess: () => {
      toast.success("Success", {
        description: "Product has been removed from inventory.",
      });
    },
    onSettled: () => {
      utils.product.getAll.invalidate();
      utils.product.aggregate.invalidate();
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive w-full justify-start"
        >
          <Trash2 className="mr-2 size-4" />
          Remove
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove <strong>{product.name}</strong> from
            your inventory. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate({ id: product.id })}
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90 text-primary-foreground"
          >
            {isPending ? "Removing..." : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
