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
import { useToast } from "@/hooks/use-toast";
import { deleteData } from "@/utils/api";
import { MongooseId, Sales } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheckBig, LucideTrash2 } from "lucide-react";
import mongoose from "mongoose";

// Cannot add icon directly to description. This is needed for the icon
const ToastWithIcon = () => (
  <div className="flex space-x-3">
    <CircleCheckBig color="#00f513" />
    <span>Sale deleted successfully</span>
  </div>
)

export default function SalesTable({ salesData }: { salesData: Sales[] }) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: (saleId: MongooseId) => {
      // (1)Argument is url, (2)Argument is the id of the data to be deleted.
      return deleteData("delete-sales", saleId)

    }, onSuccess: () => {
      // Toast is the side notification.
      toast({
        variant: "primary",
        description: <ToastWithIcon />,
      })
      // This refetches the item after deleting an sale.
      queryClient.invalidateQueries({ queryKey: ['sales'] })

    }, onError: (error) => {
      // Toast is the side notification.
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
      console.error("There was an error in deleting sale.", error);
    }
  })

  async function handleDeleteSale(
    saleId: mongoose.Types.ObjectId
  ): Promise<void> {
    try {
      // Method to delete sale.
      mutation.mutate(saleId)
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
