import { Brands } from "@/components/columns";
import { getBrands } from "@/utils/functions";
import mongoose from "mongoose";

// Types here must match the field name in collections.
type Brand = {
  _id: mongoose.Types.ObjectId;
  name: string;
  category: string;
};

export async function useFetchBrands(): Promise<Brands[]> {
  try {
    // Fetch data from your API here.
    const data = (await getBrands()).data;

    const brands = data.map((brand: Brand) => ({
      id: brand._id,
      brand: brand.name,
      category: brand.category, // Use category from brand
    }));

    return brands;
  } catch (error) {
    // Handle the error (e.g., log it, return an empty array, or show a message)
    console.error("Error fetching brands:", error);
    return []; // Returning an empty array as a fallback
  }
}
