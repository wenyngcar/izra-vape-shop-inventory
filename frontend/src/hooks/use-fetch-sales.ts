import { Sales } from "@/components/columns";
import { getData } from "@/utils/api";
import mongoose from "mongoose";

// Types here must match the field name in collections.
type Sale = {
  _id: mongoose.Types.ObjectId;
  brandId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  name: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
  date: Date;
};

export async function useFetchSales(): Promise<Sales[]> {
  try {
    // Fetch data here
    const data = (await getData("sales")).data;
    const sales = data.map((sale: Sale) => ({
      id: sale._id.toString(),
      brandId: sale.brandId,
      productId: sale.productId,
      name: sale.name,
      category: sale.category,
      quantity: sale.quantity,
      price: sale.price,
      total: sale.quantity * sale.price, // Calculate total on the fly
      date: sale.date,
    }));

    return sales;
  } catch (error) {
    console.error("Error fetching sales:", error);
    return [];
  }
}
