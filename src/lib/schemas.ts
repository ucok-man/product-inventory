import z from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters.")
    .max(100, "Product name must be at most 100 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(500, "Description must be at most 500 characters."),
  amount: z
    .number({
      required_error: "Amount is required.",
      invalid_type_error: "Amount must be a number.",
    })
    .int("Amount must be an integer.")
    .positive("Amount must be greater than 0.")
    .max(999999999, "Amount must be less than 1,000,000,000."),
  qty: z
    .number({
      required_error: "Quantity is required.",
      invalid_type_error: "Quantity must be a number.",
    })
    .int("Quantity must be an integer.")
    .nonnegative("Quantity cannot be negative.")
    .max(999999, "Quantity must be less than 1,000,000."),
});

export const updateProductSchema = z.object({
  id: z.string().uuid("Invalid product id format"),
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters.")
    .max(100, "Product name must be at most 100 characters.")
    .nullish()
    .optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(500, "Description must be at most 500 characters.")
    .nullish()
    .optional(),
  amount: z
    .number({
      required_error: "Amount is required.",
      invalid_type_error: "Amount must be a number.",
    })
    .int("Amount must be an integer.")
    .positive("Amount must be greater than 0.")
    .max(999999999, "Amount must be less than 1,000,000,000.")
    .nullish()
    .optional(),
  qty: z
    .number({
      required_error: "Quantity is required.",
      invalid_type_error: "Quantity must be a number.",
    })
    .int("Quantity must be an integer.")
    .nonnegative("Quantity cannot be negative.")
    .max(999999, "Quantity must be less than 1,000,000.")
    .nullish()
    .optional(),
});
