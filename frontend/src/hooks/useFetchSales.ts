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
    date: new Date(sale.date).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  }));

  return { isPending, isError, saleData, error };
}
