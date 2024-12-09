import { Button } from "./ui/button";
import mongoose from "mongoose";

export default function DeleteProductById(productId: mongoose.Types.ObjectId) {
  return <Button>Delete</Button>;
}
