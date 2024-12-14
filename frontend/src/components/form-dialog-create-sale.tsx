import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AddSaleForm, { FormAddSaleDialogProps } from "./form-add-sale";
import { Button } from "./ui/button";
import { useState } from "react";

export default function AddSaleDialog({
  brandId,
  productId,
}: FormAddSaleDialogProps) {
  // Submit button is inside another component, setOpen will be pass
  // as props for the dialog to get close.
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <span>Sale</span>
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create a Sale</DialogTitle>
          <DialogDescription>Create a sale</DialogDescription>
        </DialogHeader>

        {/* brandName and brandCategory is needed as props for backend validation. */}
        {/* setOpen is for the dialog to close. */}
        <AddSaleForm
          brandId={brandId}
          productId={productId}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
