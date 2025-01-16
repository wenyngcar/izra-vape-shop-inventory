import { useEffect, useState } from "react";
import { Brands, columns } from "./columns";
import { BrandTable } from "./brand-table";
import { useFetchBrands } from "@/hooks/use-fetch-brands";

export default function BrandPage() {
  const [brandData, setBrandData] = useState<Brands[]>([]);

  // Fetching data
  useEffect(() => {
    async function fetchData() {
      const brandResult = await useFetchBrands();
      setBrandData(brandResult);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <BrandTable columns={columns} data={brandData} />
    </div>
  );
}
