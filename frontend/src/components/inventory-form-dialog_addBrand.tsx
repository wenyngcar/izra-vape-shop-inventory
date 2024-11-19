import {Plus} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import InventoryForm from "./inventory-form_addBrand";

export default function InventoryFormDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild className="flex items-center">
      <button className="flex items-center">
        <Plus className="mr-2 h-4 w-4" />
        <span>Add Brand</span>
      </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Brand</DialogTitle>
          <DialogDescription>
            Enter the details for the new brand.
          </DialogDescription>
        </DialogHeader>
        <InventoryForm />
      </DialogContent>
    </Dialog>
  );
}