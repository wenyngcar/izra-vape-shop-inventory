"use client";

import { ColumnDef } from "@tanstack/react-table";
import mongoose from "mongoose";
import { Button } from "./ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Brands = {
  id: mongoose.Types.ObjectId;
  brand: string;
  category: "E-liquid" | "Device";
};

export type Items = {
  id: mongoose.Types.ObjectId;
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
    accessorKey: "action",
    header: "Action",
  },
];

export const nestedColumns: ColumnDef<Items>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => (
      // <FormDialogAddItem
      //   brandId={row.original.id}
      //   brandName={row.original.brand}
      //   brandCategory={row.original.category}
      // />
      <div className="space-x-2">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
    ),
  },
];

// const quantityColumn = nestedColumns.find(
//   (column) => "accessorKey" in column && column.accessorKey === "quantity"
// );
// if (quantityColumn) {
//   quantityColumn.cell = ({ row }) => {
//     const { quantity } = row.original;
//     return <QuantityCell value={quantity} row={row} />;
//   };
// }
