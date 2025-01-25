import { getData } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

export default function useFetchSales() {
  const { isPending, isError, data, error } = useQuery({ queryKey: ['sales'], queryFn: () => getData('sales') })


  return { isPending, isError, data, error }
}
