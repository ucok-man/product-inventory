import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  columns: number;
  rows?: number;
};

export default function TableSkeleton({ columns, rows = 10 }: Props) {
  return (
    <div className="overflow-x-auto">
      <Table>
        {/* Header */}
        <TableHeader>
          <TableRow className="border-border bg-muted/50 border-b">
            {Array.from({ length: columns }).map((_, i) => (
              <TableHead key={i} className="px-6 py-4">
                <Skeleton className="h-4 w-full" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody className="divide-border divide-y">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex} className="px-6 py-4">
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
