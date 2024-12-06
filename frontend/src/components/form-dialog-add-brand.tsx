import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import InventoryForm from "./form-add-brand";

export default function InventoryFormDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild className="flex items-center">
        <button className="flex items-center bg-black text-white px-6 py-3 rounded-md space-x-3">
          <Plus className="h-4 w-4" />
          <span>AddBrand</span>
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
