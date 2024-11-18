import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import InventoryForm from "./inventory-form";

export default function InventoryFormDialog() {
  return (
    <Dialog>
      <DialogTrigger>Add Brand</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new brand</DialogTitle>
          <DialogDescription>
            Enter the details for the new brand.
          </DialogDescription>
        </DialogHeader>
        <InventoryForm />
      </DialogContent>
    </Dialog>
  );
}
