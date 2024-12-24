import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from 'react-router-dom'
import { subDays } from 'date-fns'
import { getStaysAfterDate } from "../../services/apiBookings";

export default function useRecentStays() {
  const [searchParams] = useSearchParams()

  const numDays = searchParams.get('last') ? Number(searchParams.get('last')) : 7
  const quetyDate = subDays(new Date(), numDays).toISOString()

  const { data: stays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(quetyDate),
    queryKey: ['stays', `last-${numDays}`]
  })

  const confirmedStays = stays?.filter(stay => stay.status == 'checked-in' || stay.status == 'checked-out')

  return { stays, isLoading, confirmedStays, numDays }
}
