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
  });

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

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Enter name of product here..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
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
                            // className="bg-red-600"
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
