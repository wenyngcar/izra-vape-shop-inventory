"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Items } from "./columns";
import ItemEditFormDialog from "./form-dialog-edit-item";
import DeleteItem from "./delete-single-product";
import AddSaleDialog from "./form-dialog-create-sale";
import mongoose from "mongoose";

interface ItemDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  brandId: mongoose.Types.ObjectId;
}

export function ItemDataTable<TData, TValue>({
  columns,
  data,
  brandId,
}: ItemDataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function formatDate(unformattedDate: Date | any) {
    const date = new Date(unformattedDate);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  return (
    <div className="pl-3">
      {/* TABLE */}
      <div>
        {/* TABLE HEADER */}
        <div className=" w-full py-3">
          {table.getHeaderGroups().map((headerGroup) => (
            // HEADER CELL
            <div
              key={headerGroup.id}
              className="grid grid-cols-5 w-full text-muted-foreground font-medium"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <div key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* TABLE BODY */}
        <div>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              // TABLE ROW
              <div
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="grid grid-cols-5 border border-y border-x-0 py-3 *:flex *:items-center"
              >
                <div>{(row.original as Items).name}</div>
                <div>{(row.original as Items).quantity}</div>
                <div>&#8369; {(row.original as Items).price}</div>
                <div>{formatDate((row.original as Items).date)}</div>
                <div className="space-x-2">
                  <ItemEditFormDialog
                    itemId={(row.original as Items).id}
                    itemName={(row.original as Items).name}
                    itemQuantity={(row.original as Items).quantity}
                    itemPrice={(row.original as Items).price}
                    itemDate={(row.original as Items).date}
                  />
                  <DeleteItem itemId={(row.original as Items).id} />
                  <AddSaleDialog
                    brandId={brandId}
                    productId={(row.original as Items).id}
                    quantity={(row.original as Items).quantity}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-2xl p-14 text-center">
              {/* colSpan={columns.length} */}
              No results.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
