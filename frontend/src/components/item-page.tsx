import { useEffect, useState } from "react";
import { Items, nestedColumns } from "./columns";
import { UseFetchItems } from "@/hooks/use-fetch-items";
import { ItemDataTable } from "./item-table";

export default function ItemPage() {
  const [itemData, setItemData] = useState<Items[]>([]);

  // Fetching data
  useEffect(() => {
    async function fetchData() {
      const itemResult = await UseFetchItems();
      setItemData(itemResult);
    }
    fetchData();
  }, []);

  console.log(itemData);

  return (
    <div className="container mx-auto py-10">
      <ItemDataTable columns={nestedColumns} data={itemData} />
    </div>
  );
}
