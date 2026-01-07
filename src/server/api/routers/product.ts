import { z } from "zod";

import { createProductSchema, updateProductSchema } from "@/lib/schemas";
import { calculateMetadata, parseSortBy } from "@/lib/utils";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const PRODUCT_SORT_LIST = [
  "name",
  "-name",
  "amount",
  "-amount",
  "qty",
  "-qty",
  "createdAt",
  "-createdAt",
] as const;

export const productRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        search: z.string().trim().nullish().optional(),
        sortBy: z.enum(PRODUCT_SORT_LIST).default("-createdAt"),
        page: z.number().min(1).max(1000).default(1),
        pageSize: z.number().min(5).max(100).default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search, sortBy, page, pageSize } = input;

      const { column, direction } = parseSortBy(sortBy);
      const offset = (page - 1) * pageSize;

      if (!search || search.trim() === "") {
        const products = await ctx.db.product.findMany({
          where: { isActive: true },
          take: pageSize,
          skip: offset,
          orderBy: { [column]: direction },
        });

        const totalRecord = await ctx.db.product.count({
          where: { isActive: true },
          orderBy: { [column]: direction },
        });

        const metadata = calculateMetadata({
          page,
          pageSize,
          totalRecord,
        });

        return { products, metadata };
      }

      const searchQuery = search.trim().split(" ").join(":* || ") + ":*";

      const products = await ctx.db.product.findMany({
        where: {
          AND: {
            isActive: true,
            OR: [
              { name: { search: searchQuery } },
              { description: { search: searchQuery } },
            ],
          },
        },
        take: pageSize,
        skip: offset,
        orderBy: { [column]: direction },
      });

      const totalRecord = await ctx.db.product.count({
        where: {
          AND: {
            isActive: true,
            OR: [
              { name: { search: searchQuery } },
              { description: { search: searchQuery } },
            ],
          },
        },
        orderBy: { [column]: direction },
      });

      const metadata = calculateMetadata({
        page,
        pageSize,
        totalRecord,
      });

      return { products, metadata };
    }),

  aggregate: publicProcedure.query(async ({ ctx }) => {
    const agg = await ctx.db.product.aggregate({
      where: { isActive: true },
      _count: { id: true },
      _sum: {
        amount: true,
        qty: true,
      },
    });

    const totalProduct = agg._count.id ?? 0;
    const totalAmount = agg._sum.amount ?? 0;
    const totalQty = agg._sum.qty ?? 0;

    return {
      totalProduct,
      totalAmount,
      totalQty,
    };
  }),

  create: publicProcedure
    .input(createProductSchema)
    .mutation(async ({ ctx, input }) => {
      const duplicate = await ctx.db.product.findUnique({
        where: {
          name: input.name,
          isActive: true,
        },
      });
      if (duplicate) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Product with name ${input.name} already exist`,
        });
      }

      const product = await ctx.db.product.create({
        data: {
          name: input.name,
          description: input.description,
          amount: input.amount,
          qty: input.qty,
        },
      });
      return product;
    }),

  update: publicProcedure
    .input(updateProductSchema)
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.product.findUnique({
        where: {
          id: input.id,
          isActive: true,
        },
      });

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No product found for id #${input.id}`,
        });
      }

      if (input.name && input.name !== existing.name) {
        const duplicate = await ctx.db.product.findUnique({
          where: {
            name: input.name,
            isActive: true,
          },
        });
        if (duplicate) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Product with name ${input.name} already exist`,
          });
        }
      }

      return await ctx.db.product.update({
        where: { id: existing.id },
        data: {
          name: input.name ?? undefined,
          description: input.description ?? undefined,
          amount: input.amount ?? undefined,
          qty: input.qty ?? undefined,
        },
      });
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No product found for id #${input.id}`,
        });
      }

      return await ctx.db.product.update({
        where: { id: product.id },
        data: { isActive: false },
      });
    }),
});
