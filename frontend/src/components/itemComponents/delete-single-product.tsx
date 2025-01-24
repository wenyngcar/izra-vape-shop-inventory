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

import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { deleteData } from "@/utils/api";
import { MongooseId } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DeleteItem({ _id }: MongooseId) {

  const queryClient = useQueryClient()

  // react-query hook that is use to delete item.
  const mutation = useMutation({
    mutationFn: (itemId: MongooseId) => {
      // (1)Argument is url, (2)Argument is the id of the data to be deleted.
      return deleteData("delete-product", itemId)

    }, onSuccess: () => {
      // This refetches the item after deleting an item.
      queryClient.invalidateQueries({ queryKey: ['item'] })

    }, onError: (error) => {
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
