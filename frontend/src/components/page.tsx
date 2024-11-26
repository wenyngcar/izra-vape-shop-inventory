import { useEffect, useState } from "react";
import { Brands, columns } from "./columns";
import { DataTable } from "./data-table";
import { UseFetchBrands } from "@/hooks/use-fetch-brands";

export default function DemoPage() {
  const [data, setData] = useState<Brands[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await UseFetchBrands();
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
