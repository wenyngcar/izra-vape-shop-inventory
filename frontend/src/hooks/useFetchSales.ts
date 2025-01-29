import { getData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Sales } from "@/utils/types";

export default function useFetchSales() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["sales"],
    queryFn: () => getData("sales"),
  });

  const saleData = data?.data.map((sale: Sales) => ({
    ...sale,
    price: `₱${sale.price.toLocaleString()}`,
    total: `₱${sale.total.toLocaleString()}`,
    date: new Date(sale.date).toLocaleString(),

    // These properties is needed for filtering year
    month: new Date(sale.date).getMonth().toString(),
    year: new Date(sale.date).getFullYear().toString()
  }));

  return { isPending, isError, saleData, error };
}
