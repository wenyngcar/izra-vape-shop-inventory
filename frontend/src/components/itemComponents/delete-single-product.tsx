import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useToast } from "@/hooks/use-toast";
import { deleteData } from "@/utils/api";
import { MongooseId } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheckBig, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

// Cannot add icon directly to description. This is needed for the icon
const ToastWithIcon = () => (
  <div className="flex space-x-3">
    <CircleCheckBig color="#00f513" />
    <span>Product deleted successfully</span>
  </div>
)

export default function DeleteItem({ _id }: MongooseId) {

  const queryClient = useQueryClient()
  const { toast } = useToast()

  // react-query hook that is use to delete item.
  const mutation = useMutation({
    mutationFn: (itemId: MongooseId) => {
      // (1)Argument is url, (2)Argument is the id of the data to be deleted.
      return deleteData("delete-product", itemId)

    }, onSuccess: () => {
      // Toast is the side notification.
      toast({
        variant: "primary",
        description: <ToastWithIcon />,
      })
      // This refetches the item after deleting an item.
      queryClient.invalidateQueries({ queryKey: ['item'] })

    }, onError: (error) => {
      // Toast is the side notification.
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
      console.log("There was an error on deleting product", error);
    }
  })

  async function deleteItem() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      // Method to delete item.
      mutation.mutate(_id)
    } catch (error) {
      console.log("There was an error on deleting product", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:bg-gray-200">
          <Trash2 className="w-6 h-8 mr-2" />
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
          <DialogDescription>
            Enter the details for the new item.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => deleteItem()}>Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
