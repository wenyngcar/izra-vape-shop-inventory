import { Sales } from "@/components/columns";
import { readSales } from "@/utils/api";
import mongoose from "mongoose";

type Sale = {
  _id: mongoose.Types.ObjectId;
  brandId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  name: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
  Date: Date;
};

export async function UseFetchSales(): Promise<Sales[]> {
  try {
    const data = await readSales({});
    const sales = data.map((sale: Sale) => ({
      id: sale._id.toString(),
      brandId: sale.brandId,
      productId: sale.productId,
      name: sale.name,
      category: sale.category,
      quantity: sale.quantity,
      price: sale.price,
      total: sale.quantity * sale.price, // Calculate total on the fly
      date: new Date(sale.Date),
    }));
    return sales;
  } catch (error) {
    console.error("Error fetching sales:", error);
    return [];
  }
}
