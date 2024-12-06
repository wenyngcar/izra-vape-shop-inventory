import { Brands } from "@/components/columns";
import { readBrands } from "@/utils/api";
import mongoose from "mongoose";

type Brand = {
  _id: mongoose.Types.ObjectId;
  name: string;
  category: string;
};

export async function UseFetchBrands(): Promise<Brands[]> {
  try {
    // Fetch data from your API here.
    const data = await readBrands({});

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
