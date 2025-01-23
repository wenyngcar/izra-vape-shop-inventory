import useFetchBrand from "@/hooks/useFetchBrands";
import { columns } from "../columns";
import { BrandTable } from "./brand-table";

export default function BrandPage() {
  // Custom hook for fetching brand data
  const { isPending, isError, data, error } = useFetchBrand()

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
      <BrandTable columns={columns} data={data?.data} />
    </div>
  );
}
