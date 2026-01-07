"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { createProductSchema } from "@/lib/schemas";
import { formatNumber, parseFormattedNumber } from "@/lib/utils";
import { api } from "@/trpc/react";
import { useForm } from "@tanstack/react-form";
import * as React from "react";
import { toast } from "sonner";

type Props = {
  onSuccess: () => void;
};

export default function CreateProductForm(props: Props) {
  const [amountDisplay, setAmountDisplay] = React.useState("");
  const [qtyDisplay, setQtyDisplay] = React.useState("");

  const utils = api.useUtils();
  const { mutate, isPending } = api.product.create.useMutation({
    onError: (err) => {
      if (err.data?.code === "BAD_REQUEST") {
        toast.error("Oops!", {
          description: err.message,
        });
        return;
      }
      toast.error("Oops!", {
        description: "Failed to create product. Please try again!",
      });
    },
    onSuccess: () => {
      toast.success("Success", {
        description: "A new product has been added to inventory.",
      });
      utils.product.getAll.invalidate();
      utils.product.aggregate.invalidate();
      props.onSuccess();
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      amount: 0,
      qty: 0,
    },
    validators: {
      onSubmit: createProductSchema,
    },
    onSubmit: async ({ value }) => mutate(value),
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <div className="w-full">
      <FieldGroup>
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Product Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter clear descriptive name for a product"
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name="description"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Provide details about features, specifications, or usage.."
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={isInvalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.state.value.length}/500 characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <form.Field
            name="amount"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Amount (IDR)</FieldLabel>
                  <FieldDescription>
                    The price of product in rupiah.
                  </FieldDescription>
                  <div className="relative">
                    <span className="text-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                      Rp
                    </span>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={amountDisplay}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        const formatted = formatNumber(e.target.value);
                        setAmountDisplay(formatted);
                        const numValue = parseFormattedNumber(formatted);
                        field.handleChange(numValue);
                      }}
                      aria-invalid={isInvalid}
                      placeholder="1.500.000"
                      autoComplete="off"
                      className="pl-10 text-right"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="qty"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Quantity</FieldLabel>
                  <FieldDescription>
                    The available stock quantity.
                  </FieldDescription>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={qtyDisplay}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      const formatted = formatNumber(e.target.value);
                      setQtyDisplay(formatted);
                      const numValue = parseFormattedNumber(formatted);
                      field.handleChange(numValue);
                    }}
                    aria-invalid={isInvalid}
                    placeholder=""
                    autoComplete="off"
                    className="text-right"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </div>
      </FieldGroup>

      <div className="mt-8">
        <Button
          type="button"
          variant="default"
          className="w-full"
          onClick={handleSubmit}
          disabled={isPending}
        >
          Create Product
        </Button>
      </div>
    </div>
  );
}
