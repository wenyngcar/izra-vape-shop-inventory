import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useToast } from "@/hooks/use-toast";
import { deleteData } from "@/utils/api";
import { MongooseId, Sales } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheckBig, LucideTrash2 } from "lucide-react";
import mongoose from "mongoose";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import { Label } from "../ui/label";

// Cannot add icon directly to description. This is needed for the icon
const ToastWithIcon = () => (
  <div className="flex space-x-3">
    <CircleCheckBig color="#00f513" />
    <span>Sale deleted successfully</span>
  </div>
);

interface SaleTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function SalesTable<TData, TValue>({
  columns,
  data,
}: SaleTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      columnVisibility: {
        month: false,
        year: false
      }
    }
  });

  // Array of years. Ensures that there are +10 available years from current year.
  const years = []
  for (let year = 2025; year < (new Date().getFullYear() + 10); year++) {
    years.push(year.toString())
  }

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (saleId: MongooseId) => {
      // (1)Argument is url, (2)Argument is the id of the data to be deleted.
      return deleteData("delete-sales", saleId);
    },
    onSuccess: () => {
      // Toast is the side notification.
      toast({
        variant: "primary",
        description: <ToastWithIcon />,
      });
      // This refetches the item after deleting an sale.
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
    onError: (error) => {
      // Toast is the side notification.
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      console.error("There was an error in deleting sale.", error);
    },
  });

  async function handleDeleteSale(
    saleId: mongoose.Types.ObjectId
  ): Promise<void> {
    try {
      // Method to delete sale.
      mutation.mutate(saleId);
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  }

  // Function to get all values of a specific column.
  // This function assumes the table is in pagination.
  const getColumnValues = (columnId: string): string[] => {
    return table
      .getPrePaginationRowModel()
      .rows.map((row) => row.getValue(columnId) as string);
  };

  // Function for adding for the reduce method.
  function getSum(total: number, num: number) {
    return total + num
  }

  // Computes all the values of column. This applies to Number only.
  function columnValuesTotal(columnId: string) {
    // Stores all the column values.
    const columnArray = getColumnValues(columnId)

    // Sum of columnArray
    return columnArray.map(Number).reduce(getSum, 0)
  }

  return (
    <div>
      {/* Total Sales */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Total Sales</CardTitle>
        </CardHeader>
        <CardContent className="px-10 grid grid-cols-4 gap-3">
          <div> Total Products Sold: {columnValuesTotal('quantity').toLocaleString()} </div>
          <div>Total: ₱{columnValuesTotal('total').toLocaleString()}</div>
        </CardContent>
      </Card>

      <div className="flex py-4 space-x-4 items-center">
        {/* Search Bar */}
        <div className="space-y-1 flex-1">
          <Label className="text-primary/70">Search bar</Label>
          {/* <div className="text-primary/70">Search bar</div> */}
          <Input
            placeholder="Enter name of product here..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>

        {/* Filter by Month */}
        <div className="space-y-1 flex-2">
          <Label className="text-primary/70">Filter by Month</Label>
          {/* <div className="text-primary/70">Filter by Month</div> */}
          <Select onValueChange={(value) => table.getColumn("month")?.setFilterValue(value === "none" ? "" : value)} >
            <SelectTrigger className="max-w-xs space-x-2">
              <Filter size={"18px"} color="#171717b3" />
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {months.map((month) => {
                return <SelectItem key={month} value={months.indexOf(month).toString()}>{month}</SelectItem>
              })}
            </SelectContent>
          </Select>
        </div>


        {/* Filter by Year */}
        <div className="space-y-1 flex-2">
          <Label className="text-primary/70">Filter by Year</Label>
          {/* <div className="text-primary/70">Filter by Year</div> */}
          <Select onValueChange={(value) => table.getColumn("year")?.setFilterValue(value === "none" ? "" : value)} >
            <SelectTrigger className="max-w-xs space-x-2">
              <Filter size={"18px"} color="#171717b3" />
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {years.map((year) => {
                return <SelectItem key={year} value={year}>{year}</SelectItem>
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table of sales */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Records</CardTitle>
        </CardHeader>
        <CardContent>
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
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                          >
                            <LucideTrash2 size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Sale Record
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this sale record?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                              {/* variant prop doesn't work here as it is wrap in AlertDialogAction.
                              manual className is needed to style the button. */}
                              <Button
                                className=" bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 "
                                onClick={() =>
                                  handleDeleteSale((row.original as Sales)._id)
                                }
                              >
                                Delete
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-2xl"
                  >
                    No records of sales.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
      ;
    </div>
  );
}