"use client";

import { ColumnDef } from "@tanstack/react-table";
import FormDialogAddItem from "./form-dialog-add-item";
import mongoose from "mongoose";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Brands = {
  id: mongoose.Types.ObjectId;
  brand: string;
  category: "E-liquid" | "Device";
};

export type Items = {
  name: string;
  price: number;
  quantity: number;
  date: Date;
};

// For the table headers
export const columns: ColumnDef<Brands>[] = [
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    // Add item button per row of brand.
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

// export const nestedColumns: ColumnDef<Items>[] = [
//   {
//     accessorKey: "name",
//     header: "Name",
//   },
//   {
//     accessorKey: "price",
//     header: "Price",
//   },
//   {
//     accessorKey: "quantity",
//     header: "Quantity",
//   },
//   {
//     accessorKey: "date",
//     header: "Date",
//   },
//   {
//     accessorKey: "action",
//     header: "Action",
//     cell: () => (
//       // <FormDialogAddItem
//       //   brandId={row.original.id}
//       //   brandName={row.original.brand}
//       //   brandCategory={row.original.category}
//       // />
//       <Button>Edit</Button>
//     ),
//   },
// ];
