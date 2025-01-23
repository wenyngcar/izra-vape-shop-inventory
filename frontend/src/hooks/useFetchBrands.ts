import { getData } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"

export default function useFetchBrand() {
  // Fetching data using useQuery.
  const { isPending, isError, data, error } = useQuery({ queryKey: ['brands', 'brandId'], queryFn: () => getData('brands') })

  return { isPending, isError, data, error }
}

