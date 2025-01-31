import { Skeleton } from "@/components/ui/skeleton";
import useFetchBrand from "@/hooks/useFetchBrands";
import { AlertCircle } from "lucide-react";
import { columns } from "../columns";
import { BrandTable } from "./brand-table";

export default function BrandPage() {
  // Custom hook for fetching brand data
  const { isPending, isError, data, error } = useFetchBrand();

  // If data is still pending.
  if (isPending) {
    return (
      <div className="container mx-auto mt-10 py-10 px-5 space-y-8 border rounded-md drop-shadow-md">
        <div className="grid grid-cols-3 gap-x-5">
          <Skeleton className="h-10 col-span-2" />
          <Skeleton className=" h-10" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      </div>
    );
  }

  // If there is error in fetching data.
  if (isError) {
    console.error("Error fetching sales:", error);
    return (
      <div className="container mx-auto py-10 px-10 space-y-4">
        <div className="flex space-x-3 text-4xl font-semibold">
          <AlertCircle color="red" size={43} />
          <div>Error</div>
        </div>
        <div className="font-semibold">
          This problems might be the cause of the error:
        </div>
        <ul className="list-disc px-10">
          <li> Cannot load brand data from the server. </li>
          <li>Server might be having a connection timeout.</li>
          <li>There is a problem in your network connection.</li>
        </ul>
        <div>
          Try reloading the page. Please contact the developers if this error
          still persist.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <BrandTable columns={columns} data={data?.data} />
    </div>
  );
}