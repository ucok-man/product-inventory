import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function Header() {
  return (
    <header className="py-4 sm:py-3">
      <MaxWidthWrapper>
        <div className="mb-2 flex items-center gap-3">
          <h1 className="text-foreground font-serif text-3xl font-bold tracking-tight">
            Product Inventory
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Complete product inventory system with full CRUD operations.
        </p>
      </MaxWidthWrapper>
    </header>
  );
}
