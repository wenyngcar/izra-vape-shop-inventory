import { columns } from "../columns";
import { BrandTable } from "./brand-table";
import { getData } from "@/utils/functions";
import { useQuery } from "@tanstack/react-query";

export default function BrandPage() {
  // Fetching data using useQuery.
  const { isPending, isError, data, error } = useQuery({ queryKey: ['sales'], queryFn: () => getData('brands') })

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
        Error loading brand data
      </div>)
  }

  return (
    <div className="container mx-auto py-10">
      <BrandTable columns={columns} data={data.data} />
    </div>
  );
}
