import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabin";

export default function useCabins() {
  const { isLoading: isGettingCabins, data: cabins, error: getCabinsError } = useQuery({
    queryKey: ['cabin'],
    queryFn: getCabins
  })

  return { isGettingCabins, cabins, getCabinsError }
}