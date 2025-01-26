import useFetchBrand from "@/hooks/useFetchBrands";
import { columns } from "../columns";
import { BrandTable } from "./brand-table";
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react";

export default function BrandPage() {
  // Custom hook for fetching brand data
  const { isPending, isError, data, error } = useFetchBrand()

  // If data is still pending. 
  if (isPending) {
    return (
      <div className="container mx-auto py-10 space-y-8">
        <div className="grid grid-cols-3 gap-x-5">
          <Skeleton className="h-10 col-span-2" />
          <Skeleton className=" h-10" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      </div>)
  }

  // If there is error in fetching data.
  if (isError) {
    console.error("Error fetching sales:", error);
    return (
      <div className="container mx-auto py-10 px-10 space-y-4 h-[380px]">
        <div className="flex space-x-3 text-4xl font-semibold">
          <AlertCircle color="red" size={43} />
          <div>
            Error
          </div>
        </div>
        <ul className="list-disc px-10">
          <li> Cannot load brand data from the server. </li>
          <li> Please contact the developers if this error still persist. </li>
        </ul>
      </div>)
  }

  return (
    <div className="container mx-auto py-10">
      <BrandTable columns={columns} data={data?.data} />
    </div>
  );
}
