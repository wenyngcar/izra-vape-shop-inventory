import { Skeleton } from "@/components/ui/skeleton";
import useFetchSales from "@/hooks/useFetchSales";
import { AlertCircle } from "lucide-react";
import SalesTable from "./sales-table";
import { columns_sale } from "../columns";

export default function SalesPage() {
  // Fetching data using useQuery.
  const { isPending, isError, saleData, error } = useFetchSales();

  // If data is still pending.
  if (isPending) {
    return (
      <div className="container mx-auto mt-10 py-10 space-y-8 border px-5 rounded-md drop-shadow-md">
        <div>
          <Skeleton className="h-8 w-36" />
        </div>
        <div className="grid grid-cols-9 gap-x-4 gap-y-4">
          <Skeleton className="h-6 col-span-2" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6 col-span-2" />
          <Skeleton className="h-6 col-span-2" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6 col-span-2" />
          <Skeleton className="h-6 col-span-2" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6 col-span-2" />
          <Skeleton className="h-6 col-span-2" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6 col-span-2" />
          <Skeleton className="h-6 col-span-2" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6 col-span-2" />
          <Skeleton className="h-6 col-span-2" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6 col-span-2" />
          <Skeleton className="h-6 col-span-2" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6" />
          <Skeleton className="h-6 col-span-2" />
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
        <ul className="list-disc px-10">
          <li> Cannot load sale data from the server. </li>
          <li> Please contact the developers if this error still persist. </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <SalesTable columns={columns_sale} data={saleData} />
    </div>
  );
}
