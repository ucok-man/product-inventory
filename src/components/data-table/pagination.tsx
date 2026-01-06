import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
};

export default function Pagination({
  pageNumber,
  pageSize,
  totalCount,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const startItem = (pageNumber - 1) * pageSize + 1;
  const endItem = Math.min(pageNumber * pageSize, totalCount);

  const getPageNumbers = () => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (pageNumber <= 3) return [1, 2, 3, 4, 5];
    if (pageNumber >= totalPages - 2)
      return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
    return Array.from({ length: 5 }, (_, i) => pageNumber - 2 + i);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-2">
      <div className="text-sm text-muted-foreground">
        Showing {startItem}-{endItem} of {totalCount}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              onPageChange?.(1);
              onPageSizeChange?.(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-17.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm font-medium lg:w-25 text-center">
            Page {pageNumber} of {totalPages}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(pageNumber - 1)}
            disabled={pageNumber === 1}
          >
            <ChevronLeft /> Previous
          </Button>

          <div className="flex gap-1">
            {getPageNumbers().map((num) => (
              <Button
                key={num}
                variant={pageNumber === num ? "default" : "outline"}
                className="h-8 w-8 p-0"
                onClick={() => onPageChange?.(num)}
              >
                {num}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(pageNumber + 1)}
            disabled={pageNumber >= totalPages}
          >
            Next <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
