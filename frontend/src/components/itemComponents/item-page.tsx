import useFetchItems from "@/hooks/useFetchItems";
import { MongooseId } from "@/utils/types";
import { nestedColumns } from "../columns";
import { ItemDataTable } from "./item-table";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export default function ItemPage({ _id }: MongooseId) {
  const { isPending, isError, data, error } = useFetchItems(_id)
  if (isPending) {
    return (
      <div className="container mx-auto p-10 grid grid-cols-9 gap-3">
        <Skeleton className="h-6 col-span-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6 col-span-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6 col-span-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
      </div>)
  }

  // If there is error in fetching data.
  if (isError) {
    console.error("Error fetching items:", error);
    return (
      <div className="container mx-auto p-10 flex space-x-2">
        <AlertCircle color="red" />
        <div> Error loading product data </div>
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
