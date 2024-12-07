// QuantityCell.tsx
import { Button } from "./ui/button";
import { useState } from "react";
import { LucideMinus, LucidePlus } from "lucide-react";

interface QuantityCellProps {
  value: number;
  row: any;
}

export default function QuantityCell({ value }: QuantityCellProps) {
  const [quantity, setQuantity] = useState(value);

  function handleIncrement() {
    setQuantity(quantity + 1);
    // Update the quantity in the backend
  }

  function handleDecrement() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      // Update the quantity in the backend
    }
  }

  return (
    <div className="flex items-center">
      <Button onClick={handleDecrement} className="mr-1" variant="outline">
        <LucideMinus className="h-1 w-1 text-gray-500" />
      </Button>
      <span className="mx-1">{quantity}</span>
      <Button onClick={handleIncrement} className="ml-1" variant="outline">
        <LucidePlus className="h-1 w-1 text-gray-500" />
      </Button>
    </div>
  );
}
