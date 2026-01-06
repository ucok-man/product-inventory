import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function Header() {
  return (
    <MaxWidthWrapper>
      {/* Header */}
      <header className="py-6">
        <div className="mb-2 flex items-center gap-3">
          {/* <div className="bg-primary/10 rounded-lg p-2">
            <Package className="text-primary size-6" />
          </div> */}
          <h1 className="text-foreground font-serif text-3xl font-bold tracking-tight">
            Product Inventory
          </h1>
        </div>
        <p className="text-muted-foreground">
          Manage your products with full CRUD capabilities
        </p>
      </header>
    </MaxWidthWrapper>
  );
}
