import { useEffect, useState } from "react";
import { Brands, Items, columns } from "./columns";
import { DataTable } from "./data-table";
import { UseFetchBrands } from "@/hooks/use-fetch-brands";
import { UseFetchItems } from "@/hooks/use-fetch-items";

export default function DemoPage() {
  const [brandData, setBrandData] = useState<Brands[]>([]);
  const [itemData, setItemData] = useState<Items[]>([]);

  // Fetching data
  useEffect(() => {
    async function fetchData() {
      const brandResult = await UseFetchBrands();
      const itemResult = await UseFetchItems();
      setBrandData(brandResult);
      setItemData(itemResult);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={brandData} />
    </div>
  );
}
