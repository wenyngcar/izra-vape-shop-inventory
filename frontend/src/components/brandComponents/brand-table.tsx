import * as React from "react";
import InventoryFormDialog from "./form-dialog-add-brand";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

import { Input } from "@/components/ui/input";
import { BrandId, Brands } from "@/utils/types";
import { ChevronDown } from "lucide-react";
import FormDialogAddItem from "../itemComponents/form-dialog-add-item";
import ItemPage from "../itemComponents/item-page";

interface BrandDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function BrandTable<TData, TValue>({
  columns,
  data,
}: BrandDataTableProps<TData, TValue>) {
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
          className="min-w-sm w-full neon-input"
        />

        <InventoryFormDialog />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="grid grid-cols-3 px-2 ">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="last:place-self-center"
                    >
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

        {/* TABLE BODY */}
        <div>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Accordion
                type="single"
                collapsible
                className="w-full"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                <AccordionItem value={row.id} className="grid grid-cols-3 px-2">
                  <AccordionTrigger>
                    {(row.original as Brands).name}
                  </AccordionTrigger>
                  <AccordionTrigger>
                    {(row.original as Brands).category}
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionTrigger>
                  <div className="place-self-center">
                    <FormDialogAddItem
                      brandId={(row.original as Brands)._id}
                      brandName={(row.original as Brands).name}
                      brandCategory={(row.original as Brands).category}
                    />
                  </div>
                  <AccordionContent className="col-span-3">
                    <ItemPage brandId={(row.original as BrandId).brandId} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))
          ) : (
            <div>
              <div className="text-2xl p-14 text-center">No results.</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
