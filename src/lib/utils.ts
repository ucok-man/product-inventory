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

export function parseNumberFromQuery(
  value: string | null | undefined,
  defaultValue: number,
): number {
  // If value is null or undefined, return default
  if (value == null) {
    return defaultValue;
  }

  // Parse the string to a number
  const parsed = Number(value);

  // If parsing resulted in NaN, return default
  if (isNaN(parsed)) {
    return defaultValue;
  }

  return parsed;
}

export function parseStringFromQuery(
  value: string | null | undefined,
  defaultValue: string,
): string | undefined {
  // If value is null or undefined, return default
  const parsed = value?.trim();
  if (!parsed) {
    return defaultValue;
  }

  return parsed;
}

export const formatNumber = (value: string): string => {
  const num = value.replace(/\D/g, "");
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const parseFormattedNumber = (value: string): number => {
  return parseInt(value.replace(/\D/g, "") || "0", 10);
};
