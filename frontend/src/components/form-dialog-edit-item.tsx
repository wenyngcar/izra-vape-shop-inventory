import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FormEditItem from "./form-edit-item";
import { Button } from "./ui/button";
import { useState } from "react";
import { FormEditItemDialogProps } from "./form-edit-item";

export default function ItemEditFormDialog({
  itemId,
  itemName,
  itemQuantity,
  itemPrice,
  itemDate,
}: FormEditItemDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>
            Enter the details for the new item.
          </DialogDescription>
        </DialogHeader>
        <FormEditItem
          itemId={itemId}
          itemName={itemName}
          itemQuantity={itemQuantity}
          itemPrice={itemPrice}
          itemDate={itemDate}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
