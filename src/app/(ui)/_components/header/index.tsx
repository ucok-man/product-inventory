import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function Header() {
  return (
    <header className="border-border/70 border-b py-4 sm:py-3">
      <MaxWidthWrapper>
        <div className="mb-2 flex items-center gap-3">
          <h1 className="text-foreground font-serif text-3xl font-bold tracking-tight">
            Product Inventory
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Manage your products with full CRUD capabilities
        </p>
      </MaxWidthWrapper>
    </header>
  );
}
