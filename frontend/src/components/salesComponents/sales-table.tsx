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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteData } from "@/utils/api";
import { LucideTrash2 } from "lucide-react";
import mongoose from "mongoose";
import { Sales } from "@/utils/types";

export default function SalesTable({ salesData }: { salesData: Sales[] }) {
  async function handleDeleteSale(
    saleId: mongoose.Types.ObjectId
  ): Promise<void> {
    try {
      // (1)Argument is url, (2)Argument is sale id.
      await deleteData("delete-sales", saleId);
      // console.log(`Successfully deleted sale with ID: ${saleId}`);
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Sales Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Sold At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((sale, index) => (
                <TableRow key={index}>
                  <TableCell>{sale.name}</TableCell>
                  <TableCell>{sale.category}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>&#8369;{sale.price.toFixed(2)}</TableCell>
                  <TableCell>
                    &#8369;{(sale.price * sale.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>{new Date(sale.date).toLocaleString()}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
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
                            <Button onClick={() => handleDeleteSale(sale._id)}>
                              Delete
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      ;
    </div>
  );
}
