import SalesTable from "./sales-table";
import { useQuery } from "@tanstack/react-query"
import { getData } from "@/utils/api";

export default function SalesPage() {
  // Fetching data using useQuery.
  const { isPending, isError, data, error } = useQuery({ queryKey: ['sales'], queryFn: () => getData('sales') })

  // If data is still pending. 
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
        Error loading sales data
      </div>)
  }

  return (
    <div className="container mx-auto py-10">
      <SalesTable salesData={data.data} />
    </div>
  );
}
