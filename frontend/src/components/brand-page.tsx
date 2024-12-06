import { useEffect, useState } from "react";
import { Brands, columns } from "./columns";
import { BrandTable } from "./brand-table";
import { UseFetchBrands } from "@/hooks/use-fetch-brands";
// import { UseFetchItems } from "@/hooks/use-fetch-items";

export default function BrandPage() {
  const [brandData, setBrandData] = useState<Brands[]>([]);
  // const [itemData, setItemData] = useState<Items[]>([]);

  // Fetching data
  useEffect(() => {
    async function fetchData() {
      const brandResult = await UseFetchBrands();
      // const itemResult = await UseFetchItems();
      setBrandData(brandResult);
      // setItemData(itemResult);
    }
    fetchData();
  }, []);

  // console.log(brandData);

  return (
    <div className="container mx-auto py-10">
      <BrandTable columns={columns} data={brandData} />
    </div>
  );
}
