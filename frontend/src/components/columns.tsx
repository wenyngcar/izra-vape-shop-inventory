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
    cell: ({ row }) => `₱${Number(row.getValue('price')).toLocaleString()}`
    // cell: ({ row }) => `₱${row.getValue('price')}`
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => `₱${Number(row.getValue('total')).toLocaleString()}`
    // cell: ({ row }) => `₱${row.getValue('total')}`
  },
  {
    accessorKey: "date",
    header: "Solt at",
  },
  {
    // This column is not needed for display but is used for filtering.
    accessorKey: "month",
    header: "Month",
  },
  {
    // This column is not needed for display but is used for filtering.
    accessorKey: "year",
    header: "Year",
  },
];
