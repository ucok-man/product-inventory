import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseSortBy(input: string): {
  column: string;
  direction: "asc" | "desc";
} {
  if (input.startsWith("-")) {
    return {
      column: input.substring(1),
      direction: "desc",
    };
  }

  return {
    column: input,
    direction: "asc",
  };
}

export function calculateMetadata(param: {
  totalRecord: number;
  pageSize: number;
  page: number;
}) {
  const lastPage = Math.ceil(param.totalRecord / param.pageSize);
  const nextPage = param.page < lastPage ? param.page + 1 : null;

  return {
    pageSize: param.pageSize,
    currentPage: param.page,
    totalRecord: param.totalRecord,
    nextPage: nextPage,
    lastPage: lastPage,
  };
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// export function keysFromObject(obj: Record<string, string>): string[] {
//   return Object.keys()
// }
