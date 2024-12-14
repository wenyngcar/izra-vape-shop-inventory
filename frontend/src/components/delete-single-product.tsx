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

import { Button } from "./ui/button";
import mongoose from "mongoose";
import { deleteOneItem } from "@/utils/api";
import { Trash2 } from 'lucide-react';

type deleteProduct = {
  itemId: mongoose.Types.ObjectId;
};

export default function DeleteItem({ itemId }: deleteProduct) {
  async function deleteItem() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      deleteOneItem({ _id: itemId });
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
