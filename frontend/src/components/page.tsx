import { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { readBrands } from "@/utils/api";
import mongoose from "mongoose";

type Brand = {
  _id: mongoose.Types.ObjectId;
  name: string;
  category: string;
};

async function getData(): Promise<Payment[]> {
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

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
