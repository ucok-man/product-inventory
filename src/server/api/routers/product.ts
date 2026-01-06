import { z } from "zod";

import { calculateMetadata, parseSortBy } from "@/lib/utils";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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
});
