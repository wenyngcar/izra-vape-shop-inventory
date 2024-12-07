import { Plus } from "lucide-react";
import { FormAddItemDialogProps } from "./form-add-item";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FormAddItem from "./form-add-item";
import { Button } from "./ui/button";
import { useState } from "react";

export default function InventoryFormDialog({
  brandId,
  brandName,
  brandCategory,
}: FormAddItemDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          <span>Add Item</span>
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>
            Enter the details for the new item.
          </DialogDescription>
        </DialogHeader>
        <FormAddItem
          brandId={brandId}
          brandName={brandName}
          brandCategory={brandCategory}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
