"use client";

import { ColumnDef } from "@tanstack/react-table";
import InventoryFormDialog from "./form-dialog-add-item";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  brand: string;
  category: "E-liquid" | "Device";
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <InventoryFormDialog brandName={row.original.brand} />,
  },
];
