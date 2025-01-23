import { Items } from "@/components/columns";
import { getData } from "@/utils/api";
import mongoose from "mongoose";

// Types here must match the field name in collections.
type Item = {
  _id: mongoose.Types.ObjectId;
  brandId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  expiration: Date;
};

export async function UseFetchItems(
  id: mongoose.Types.ObjectId
): Promise<Items[]> {
  try {
    // Fetch data from your API here.
    const data = (await getData("products", { brandId: id })).data;

    const items = data.map((item: Item) => ({
      id: item._id,
      brandId: item.brandId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      date: item.expiration,
    }));

    return items;
  } catch (error) {
    // Handle the error (e.g., log it, return an empty array, or show a message)
    console.error("Error fetching items:", error);
    return []; // Returning an empty array as a fallback
  }
}
