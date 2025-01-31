import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import BrandInventoryForm from "./form-add-brand";
import { Button } from "../ui/button";
import { useState } from "react";

export default function InventoryFormDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex items-center">
        <Button>
          <Plus color="white" />
          <span className="">Add Brand</span>
        </Button>
      </DialogTrigger>
      {/* onInteractOutside function prevents the dialog from closing when click outside of content. */}
      <DialogContent onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add New Brand</DialogTitle>
          <DialogDescription>
            Enter the details for the new brand.
          </DialogDescription>
        </DialogHeader>
        <BrandInventoryForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
