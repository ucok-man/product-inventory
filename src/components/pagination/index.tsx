/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQueryState } from "nuqs";
import type { PropsWithChildren } from "react";

type Props = {
  totalCount: number;
  className?: string;
};

const PAGE_SIZE_OPTIONS = [10, 20, 30, 40, 50] as const;
const DEFAULT_PAGE_SIZE = 10;

export default function Pagination({ totalCount, className }: Props) {
  const [pageNumber, setPageNumber] = useQueryState("page", {
    defaultValue: "1",
    parse: (value) => value ?? "1",
  });
  const [pageSize, setPageSize] = useQueryState("pageSize", {
    defaultValue: String(DEFAULT_PAGE_SIZE),
    parse: (value) => value ?? String(DEFAULT_PAGE_SIZE),
  });

  const currentPage = Number(pageNumber);
  const currentPageSize = Number(pageSize);
  const totalPages = Math.ceil(totalCount / currentPageSize);

  const startItem = (currentPage - 1) * currentPageSize + 1;
  const endItem = Math.min(currentPage * currentPageSize, totalCount);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    if (currentPage >= totalPages - 2) {
      return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
    }
    return Array.from({ length: 5 }, (_, i) => currentPage - 2 + i);
  };

  const handlePageSizeChange = (value: string) => {
    setPageNumber("1");
    setPageSize(value);
  };

  const handlePageChange = (page: number) => {
    setPageNumber(String(page));
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 px-2 lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
    >
      {/* Results count */}
      <p className="text-muted-foreground text-sm">
        Showing <Highlight>{startItem}</Highlight>-
        <Highlight>{endItem}</Highlight> of <Highlight>{totalCount}</Highlight>
      </p>

      {/* Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
        {/* Page size selector */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Rows per page</span>
          <Select value={pageSize} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="border-border bg-background h-9 w-18">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm lg:w-25 lg:text-center">
            Page <Highlight>{currentPage}</Highlight> of{" "}
            <Highlight>{totalPages}</Highlight>
          </span>

          {/* Previous button */}
          <Button
            variant="default"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={isFirstPage}
            className="gap-1"
          >
            <ChevronLeft className="size-4" />
            <span className="hidden sm:inline">Prev</span>
          </Button>

          {/* Page numbers */}
          <div className="hidden items-center gap-1 md:flex">
            {getPageNumbers().map((num) => (
              <Button
                key={num}
                variant={currentPage === num ? "default" : "outline"}
                size="icon"
                className={cn(
                  "h-9 w-9 transition-colors",
                  currentPage === num && "shadow-sm",
                  currentPage !== num && "text-muted-foreground font-normal",
                )}
                onClick={() => handlePageChange(num)}
              >
                {num}
              </Button>
            ))}
          </div>

          {/* Next button */}
          <Button
            variant="default"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={isLastPage}
            className="gap-1"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function Highlight({ children }: PropsWithChildren) {
  return <span className="text-foreground">{children}</span>;
}
