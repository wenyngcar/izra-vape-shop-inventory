"use client";

import * as React from "react";
import InventoryFormDialog from "./form-dialog-add-brand";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Input } from "@/components/ui/input";
import FormDialogAddItem from "./form-dialog-add-item";
import { Brands } from "./columns";
import { ChevronDown } from "lucide-react";

interface BrandDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// interface ItemDataTableProps<TData, TValue> {
//   itemColumns: ColumnDef<TData, TValue>[];
//   itemData: TData[];
// }

export function DataTable<TData, TValue>({
  columns,
  data,
}: BrandDataTableProps<TData, TValue>) {
  // { itemColumns, itemData }: ItemDataTableProps<TData, TValue>
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <div className="flex items-center justify-around space-x-4 py-4">
        <Input
          placeholder="Search brand here..."
          value={(table.getColumn("brand")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("brand")?.setFilterValue(event.target.value)
          }
          className="min-w-sm w-full"
        />
        <InventoryFormDialog />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        </Table>
        <div>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <div key={row.id} data-state={row.getIsSelected() && "selected"}>
                {/* {row.getVisibleCells().map((cell) => ( */}
                <div key={row.id}>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem
                      value={row.id}
                      className="grid grid-cols-3 px-2 "
                    >
                      <AccordionTrigger>
                        {(row.original as Brands).brand}

                        {/* {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                              )} */}
                      </AccordionTrigger>
                      <AccordionTrigger>
                        {(row.original as Brands).category}
                        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                      </AccordionTrigger>
                      <FormDialogAddItem
                        brandId={(row.original as Brands).id}
                        brandName={(row.original as Brands).brand}
                        brandCategory={(row.original as Brands).category}
                      />
                      <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                {/* ))} */}
              </div>
            ))
          ) : (
            <div>
              <div className="h-24 text-center">No results.</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
