/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PropsWithChildren } from "react";
import EmptyState from "./empty-state";
import TableSkeleton from "./table-skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const hasNoData = !isLoading && !data.length;

  if (isLoading) {
    return (
      <Container>
        <TableSkeleton columns={columns.length} />
      </Container>
    );
  }

  if (hasNoData) {
    return (
      <Container>
        <EmptyState
          title="No Products Yet"
          description="You haven’t added any products yet. Create your first product to get started."
          className="min-h-80"
        />
      </Container>
    );
  }

  return (
    <Container>
      <div className="overflow-x-auto">
        <Table>
          {/* Enhanced header with theme variables */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow
                key={headerGroup.id}
                className="border-border bg-muted/50 hover:bg-muted/70 border-b transition-colors"
              >
                {headerGroup.headers.map((header: any) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-muted-foreground px-6 py-4 text-left text-sm font-semibold tracking-wider uppercase"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          {/* Professional body with theme-aware colors */}
          <TableBody className="divide-border bg-card divide-y">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/30 data-[state=selected]:bg-primary/10 transition-colors"
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell
                      key={cell.id}
                      className="text-card-foreground px-6 py-4 text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground h-32 text-center text-sm"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
}

function Container({ children }: PropsWithChildren) {
  return (
    <div className="w-full">
      <div className="bg-card overflow-hidden rounded-lg border-0 shadow-sm">
        {children}
      </div>
    </div>
  );
}
