export const PRODUCT_SORT_MAP = {
  "Name: A to Z": "name",
  "Name: Z to A": "-name",
  "Price: Low to High": "amount",
  "Price: High to Low": "-amount",
  "Stock: Low to High": "qty",
  "Stock: High to Low": "-qty",
  "Oldest First": "createdAt",
  "Newest First": "-createdAt",
} as const;

export const PAGE_SIZE_OPTIONS = [5, 10, 20, 30, 40, 50];
