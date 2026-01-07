import MaxWidthWrapper from "@/components/max-width-wrapper";
import ThreeDotLoader from "@/components/three-dot-loader";
import { Suspense } from "react";
import ProductList from "./_components/product-list";
import ProductSummaries from "./_components/product-summaries";

export default function HomePage() {
  return (
    <MaxWidthWrapper className="space-y-12 py-6">
      <ProductSummaries />
      <Suspense fallback={<Loader />}>
        <ProductList />
      </Suspense>
    </MaxWidthWrapper>
  );
}

function Loader() {
  return (
    <div className="bg-background flex min-h-[50vh] w-full flex-col items-center justify-center gap-3 px-4 text-center">
      <ThreeDotLoader size="lg" />
      <p className="text-muted-foreground text-base">Loading resources...</p>
    </div>
  );
}
