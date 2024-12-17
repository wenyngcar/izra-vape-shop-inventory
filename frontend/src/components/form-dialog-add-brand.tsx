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
import { Button } from "./ui/button";
import { useState } from "react";

export default function InventoryFormDialog() {
  const [open, setOpen] = useState(false);

  return (
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild className="flex items-center">
    <Button className="bg-[#1a1a2e] text-white hover:bg-[#33334d] focus:ring-2 focus:ring-[#1a1a2e]">
      <Plus className="h-4 w-4 text-white" />
      <span className="text-white">Add Brand</span>
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
