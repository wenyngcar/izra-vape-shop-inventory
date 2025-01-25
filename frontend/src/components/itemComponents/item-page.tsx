import useFetchItems from "@/hooks/useFetchItems";
import { MongooseId } from "@/utils/types";
import { nestedColumns } from "../columns";
import { ItemDataTable } from "./item-table";

export default function ItemPage({ _id }: MongooseId) {
  const { isPending, isError, data, error } = useFetchItems(_id)
  if (isPending) {
    return (
      <div className="container mx-auto py-10">
        Loading...
      </div>)
  }

  // If there is error in fetching data.
  if (isError) {
    console.error("Error fetching sales:", error);
    return (
      <div className="container mx-auto py-10">
        Error loading brand data
      </div>)
  }

  return (
    <div className="container mx-auto pb-8">
      <ItemDataTable
        columns={nestedColumns}
        data={data?.data}
        // brandId is not necessary for displaying but need for sale button.
        brandId={_id}
      />
    </div>
  );
}
