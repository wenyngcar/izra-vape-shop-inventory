import { useEffect, useState } from "react";
import { useFetchSales } from "@/hooks/use-fetch-sales";
import SalesTable from "./sales-table";
import { Sales } from "../columns";

export default function SalesPage() {
  // Store and set the data here.
  const [salesData, setSalesData] = useState<Sales[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        // Fetch data ...
        const salesResult = await useFetchSales();

        // // Format the date
        // const formattedSales = salesData.map((sale) => ({
        //   ...sale,
        //   date: new Date(sale.date).toISOString(),
        // }));

        setSalesData(salesResult);
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
