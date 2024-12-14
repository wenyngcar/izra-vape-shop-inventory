import { useEffect, useState } from "react";
import { Items, nestedColumns } from "./columns";
import { UseFetchItems } from "@/hooks/use-fetch-items";
import { ItemDataTable } from "./item-table";
import mongoose from "mongoose";

type BrandId = {
  brandId: mongoose.Types.ObjectId;
};

export default function ItemPage({ brandId }: BrandId) {
  const [itemData, setItemData] = useState<Items[]>([]);

  // Fetching data
  useEffect(() => {
    async function fetchData() {
      const itemResult = await UseFetchItems(brandId);
      setItemData(itemResult);
    }
    fetchData();
  }, [itemData]);

  return (
    <div className="container mx-auto pb-8">
      <ItemDataTable
        columns={nestedColumns}
        data={itemData}
        brandId={brandId}
      />
    </div>
  );
}
