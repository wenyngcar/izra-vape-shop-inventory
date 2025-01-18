import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FormEditItem from "./form-edit-item";
import { Button } from "../ui/button";
import { useState } from "react";
import { FormEditItemDialogProps } from "./form-edit-item";
import { PencilLine } from "lucide-react";

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
        <Button variant="outline" className="hover:bg-gray-200">
          <PencilLine className="w-6 h-8 mr-2" />
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit Current Item</DialogTitle>
          <DialogDescription>Enter new details for the item.</DialogDescription>
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
