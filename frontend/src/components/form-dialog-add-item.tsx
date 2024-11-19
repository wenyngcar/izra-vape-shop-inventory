import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import InventoryForm from "./form-add-item";

interface InventoryFormDialogProps {
  brandName: string;
}

export default function InventoryFormDialog({
  brandName,
}: InventoryFormDialogProps) {
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
        <InventoryForm />
      </DialogContent>
    </Dialog>
  );
}
