import mongoose from "mongoose";
import { useEffect, useState } from "react";
import { UseFetchSales } from "@/hooks/use-fetch-sales";
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
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const salesData = await UseFetchSales();
        const formattedSales = salesData.map((sale) => ({
          ...sale,
          date: new Date(sale.date).toISOString(),
        }));
        setSales(formattedSales);
        console.log(`Sales fetched: ${formattedSales.length}`);
      } catch (error) {
        console.error("Failed to fetch sales data:", error);
      }
    };

    fetchSales();
  }, []);
  return (
    <div className="container mx-auto py-10">
      <SalesTable sales={sales} />
    </div>
  );
}
