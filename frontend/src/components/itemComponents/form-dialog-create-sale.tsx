import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AddSaleForm, { FormAddSaleDialogProps } from "./form-add-sale";
import { Button } from "../ui/button";
import { useState } from "react";
import { PhilippinePeso } from "lucide-react";

export default function AddSaleDialog({
  brandId,
  productId,
  quantity,
}: FormAddSaleDialogProps) {
  // Submit button is inside another component, setOpen will be pass
  // as props for the dialog to get close.
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PhilippinePeso />
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Confirm Sale</DialogTitle>
          <DialogDescription>
            Are you sure you want to mark this item as sold?
          </DialogDescription>
        </DialogHeader>

        {/* brandName and brandCategory is needed as props for backend validation. */}
        {/* setOpen is for the dialog to close. */}
        <AddSaleForm
          brandId={brandId}
          productId={productId}
          quantity={quantity}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
