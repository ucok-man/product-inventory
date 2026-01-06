import MaxWidthWrapper from "@/components/max-width-wrapper";
import ProductList from "./_components/product-list";
import ProductSummaries from "./_components/product-summaries";

export default function HomePage() {
  return (
    <MaxWidthWrapper className="space-y-12 py-6">
      <ProductSummaries />
      <ProductList />
    </MaxWidthWrapper>
  );
}
