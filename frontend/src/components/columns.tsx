"use client";

import { ColumnDef } from "@tanstack/react-table";
import FormDialogAddItem from "./form-dialog-add-item";
import mongoose from "mongoose";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: mongoose.Types.ObjectId;
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
    cell: ({ row }) => (
      <FormDialogAddItem
        brandId={row.original.id}
        brandName={row.original.brand}
        brandCategory={row.original.category}
      />
    ),
  },
];
