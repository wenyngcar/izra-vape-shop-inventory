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

export default function InventoryFormDialog({
  brandId,
  brandName,
  brandCategory,
}: FormAddItemDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Item</span>
        </button>
      </DialogTrigger>
      <DialogContent>
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
        />
      </DialogContent>
    </Dialog>
  );
}
