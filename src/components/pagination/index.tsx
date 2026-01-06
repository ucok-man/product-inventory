import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useQueryState } from "nuqs";
import type { PropsWithChildren } from "react";
import PaginationSkeleton from "./pagination-skeleton";

type props = {
  totalRecord: number;
  page: {
    current: number;
    total: number;
  };
  pageSize: {
    current: number;
    options: number[];
  };
  isLoading: boolean;
  className?: string;
};

export default function Pagination({
  totalRecord,
  page,
  pageSize,
  className,
  isLoading,
}: props) {
  const [currentPage, setCurrentPage] = useQueryState("page", {
    defaultValue: String(page.current),
  });

  const [currentPageSize, setCurrentPageSize] = useQueryState("pageSize", {
    defaultValue: String(pageSize.current),
  });

  // Calculate display values
  const startItem = (page.current - 1) * pageSize.current + 1;
  const endItem = Math.min(page.current * pageSize.current, totalRecord);
  const isFirstPage = page.current === 1;
  const isLastPage = page.current >= page.total;

  const handlePageSizeChange = (value: string) => {
    setCurrentPage("1");
    setCurrentPageSize(value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(String(newPage));
  };

  if (isLoading) {
    return <PaginationSkeleton className={className} />;
  }

  if (totalRecord === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-6 px-2 lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
    >
      <div className="flex flex-col gap-4 max-lg:justify-between sm:flex-row sm:items-center sm:gap-6">
        {/* Count Result */}
        <p className="text-muted-foreground text-sm">
          Showing <Highlight>{startItem}</Highlight> to{" "}
          <Highlight>{endItem}</Highlight> of{" "}
          <Highlight>{totalRecord}</Highlight>
        </p>

        {/* Page size selector */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">
            Rows <span className="hidden sm:inline">per page</span>
          </span>
          <Select value={currentPageSize} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="border-border bg-background h-9 w-18">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              {pageSize.options.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Page navigation */}
      <div className="flex flex-col items-center gap-3 lg:flex-row lg:gap-4">
        <span className="text-muted-foreground text-sm">
          Page <Highlight>{page.current}</Highlight> of{" "}
          <Highlight>{page.total}</Highlight>
        </span>

        <div className="flex items-center gap-2">
          {/* First and Previous buttons */}
          <div className="flex gap-1">
            <Button
              variant="default"
              size="icon"
              onClick={() => handlePageChange(1)}
              disabled={isFirstPage}
              aria-label="First page"
            >
              <ChevronsLeft className="size-4" />
            </Button>

            <Button
              variant="default"
              size="icon"
              onClick={() => handlePageChange(page.current - 1)}
              disabled={isFirstPage}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </Button>
          </div>

          {/* Current page indicator */}
          <Button
            variant="outline"
            size="icon"
            className="text-foreground h-9 w-9 cursor-default font-normal hover:bg-transparent"
            aria-label={`Current page ${page.current}`}
          >
            {page.current}
          </Button>

          {/* Next and Last buttons */}
          <div className="flex gap-1">
            <Button
              variant="default"
              size="icon"
              onClick={() => handlePageChange(page.current + 1)}
              disabled={isLastPage}
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </Button>

            <Button
              variant="default"
              size="icon"
              onClick={() => handlePageChange(page.total)}
              disabled={isLastPage}
              aria-label="Last page"
            >
              <ChevronsRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Highlight({ children }: PropsWithChildren) {
  return <span className="text-foreground font-normal">{children}</span>;
}
