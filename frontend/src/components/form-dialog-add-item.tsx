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

export default function InventoryFormDialog({
  brandId,
  brandName,
  brandCategory,
}: FormAddItemDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          <span>Add Item</span>
        </Button>
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
