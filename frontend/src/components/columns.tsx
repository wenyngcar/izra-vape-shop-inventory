import { ColumnDef } from "@tanstack/react-table";
import { Brands, Items, Sales } from "@/utils/types";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// For the table headers
export const columns: ColumnDef<Brands>[] = [
  {
    accessorKey: "name",
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
  },
];

export const columns_sale: ColumnDef<Sales>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
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
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "date",
    header: "Solt at",
  },
];
