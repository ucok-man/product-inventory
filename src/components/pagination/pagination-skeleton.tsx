import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function PaginationSkeleton({ className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 px-2 lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
    >
      <div className="flex flex-col gap-4 max-lg:justify-between sm:flex-row sm:items-center sm:gap-6">
        {/* Results count skeleton */}
        <Skeleton className="h-5 w-36" />

        {/* Page size selector skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-18" />
        </div>
      </div>

      {/* Page navigation skeleton */}
      <div className="flex flex-col items-center gap-3 lg:flex-row lg:gap-4">
        <Skeleton className="h-5 w-20" />

        <div className="flex items-center gap-2">
          {/* First and Previous buttons group */}
          <div className="flex gap-1">
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
          </div>

          {/* Current page indicator */}
          <Skeleton className="h-9 w-9" />

          {/* Next and Last buttons group */}
          <div className="flex gap-1">
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>
      </div>
    </div>
  );
}
