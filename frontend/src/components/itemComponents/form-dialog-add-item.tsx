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
import { Button } from "../ui/button";
import { useState } from "react";

export default function InventoryFormDialog({
  brandId,
  brandName,
  brandCategory,
}: FormAddItemDialogProps) {
  // Submit button is inside another component, setOpen will be pass
  // as props for the dialog to get close.
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1a1a2e] text-white hover:bg-[#33334d] focus:ring-2 focus:ring-[#1a1a2e]">
          <Plus className="h-4 w-4 text-white" />
          <span className="text-white">Add Item</span>
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>
            Enter the details for the new item.
          </DialogDescription>
        </DialogHeader>

        {/* brandName and brandCategory is needed as props for backend validation. */}
        {/* setOpen is for the dialog to close. */}
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
