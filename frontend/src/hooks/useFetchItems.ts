import { getData } from "@/utils/api";
import { MongooseId } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export default function useFetchItems(_id: MongooseId) {
  const { isPending, isError, data, error } = useQuery({ queryKey: ['item', _id], queryFn: () => getData('products', { 'brandId': _id }) })

  return { isPending, isError, data, error }
}
