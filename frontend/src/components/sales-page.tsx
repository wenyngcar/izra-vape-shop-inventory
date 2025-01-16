import mongoose from "mongoose";
import { useEffect, useState } from "react";
import { useFetchSales } from "@/hooks/use-fetch-sales";
import SalesTable from "./sales-table";

export type Sale = {
  id: mongoose.Types.ObjectId;
  name: string;
  category: string;
  quantity: number;
  price: number;
  date: string;
};

export default function SalesPage() {
  // Store and set the data here.
  const [salesData, setSalesData] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        // Fetch data ...
        const salesData = await useFetchSales();

        // Format the date
        const formattedSales = salesData.map((sale) => ({
          ...sale,
          date: new Date(sale.date).toISOString(),
        }));

        setSalesData(formattedSales);
      } catch (error) {
        console.error("Failed to fetch salesData data:", error);
      }
    };

    fetchSales();
  }, []);
  return (
    <div className="container mx-auto py-10">
      <SalesTable salesData={salesData} />
    </div>
  );
}
