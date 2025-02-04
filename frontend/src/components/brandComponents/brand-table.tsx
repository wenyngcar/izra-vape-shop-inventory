import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { deleteData } from "@/utils/api";
import { Brands, MongooseId } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import {
  ChevronDown,
  CircleCheckBig,
  LucideTrash2,
  Filter,
} from "lucide-react";
import mongoose from "mongoose";
import * as React from "react";
import FormDialogAddItem from "../itemComponents/form-dialog-add-item";
import ItemPage from "../itemComponents/item-page";
import { Button } from "../ui/button";
import InventoryFormDialog from "./form-dialog-add-brand";

interface BrandDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// Cannot add icon directly to description. This is needed for the icon
const ToastWithIcon = () => (
  <div className="flex space-x-3">
    <CircleCheckBig color="#00f513" />
    <span>Brand deleted successfully</span>
  </div>
);

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

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (brandId: MongooseId) => {
      // (1)Argument is url, (2)Argument is the id of the data to be deleted.
      return deleteData("delete-brand", brandId);
    },
    onSuccess: () => {
      // Toast is the side notification.
      toast({
        variant: "primary",
        description: <ToastWithIcon />,
      });

      // This refetches the brands after deleting an sale.
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: (error) => {
      // Toast is the side notification.
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      console.error("There was an error in deleting brand.", error);
    },
  });

  async function handleDeleteBrand(
    brandId: mongoose.Types.ObjectId
  ): Promise<void> {
    try {
      // Method to delete sale.
      mutation.mutate(brandId);
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  }

  return (
    <>
      <div className="flex items-center justify-around space-x-4 py-4">
        {/* Search bar */}
        <Input
          placeholder="Search brand here..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="min-w-sm w-full flex-2"
        />
        <Select
          onValueChange={(value) =>
            table
              .getColumn("category")
              ?.setFilterValue(value === "none" ? "" : value)
          }
        >
          <SelectTrigger className="flex-1 space-x-2">
            <Filter size={"18px"} color="#171717b3" />
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="Device">Device</SelectItem>
            <SelectItem value="E-liquid">E-liquid</SelectItem>
          </SelectContent>
        </Select>
        {/* Button for adding brand. */}
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
                  <div className="place-self-center space-x-3">
                    {/* Button for adding item. */}
                    <FormDialogAddItem
                      brandId={(row.original as Brands)._id}
                      brandName={(row.original as Brands).name}
                      brandCategory={(row.original as Brands).category}
                    />

                    {/* Button for deleting brand. */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          <LucideTrash2 />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Do you want to delete this brand?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. Do you wish to delete
                            the brand &nbsp;
                            {(row.original as Brands).name}
                            &nbsp;from your inventory?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction asChild>
                            <Button
                              onClick={() =>
                                handleDeleteBrand((row.original as Brands)._id)
                              } >
                              Delete
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <AccordionContent className="col-span-3">
                    <ItemPage _id={(row.original as MongooseId)._id} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))
          ) : (
            <div>
              <div className="text-2xl p-14 text-center">
                No record of brands.
              </div>
            </div>
          )}
        </div>
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
      </div>
    </>
  );
}