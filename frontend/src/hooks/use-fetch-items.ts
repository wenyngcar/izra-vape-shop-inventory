import { Items } from "@/components/columns";
import { readProducts } from "@/utils/api";
import mongoose from "mongoose";

type Item = {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  date: Date;
};

export async function UseFetchItems(): Promise<Items[]> {
  try {
    // Fetch data from your API here.
    const data = await readProducts({});

    const items = data.map((item: Item) => ({
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      date: item.date,
    }));

    return items;
  } catch (error) {
    // Handle the error (e.g., log it, return an empty array, or show a message)
    console.error("Error fetching items:", error);
    return []; // Returning an empty array as a fallback
  }
}
