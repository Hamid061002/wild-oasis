import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from 'react-router-dom'
import { subDays } from 'date-fns'
import { getBookingsAfterDate } from "../../services/apiBookings";

export default function useRecentBooknigs() {
  const [searchParams] = useSearchParams()

  const numDays = searchParams.get('last') ? Number(searchParams.get('last')) : 7
  const quetyDate = subDays(new Date(), numDays).toISOString()
  
  const { data: bookings, isLoading } =  useQuery({
    queryFn: () => getBookingsAfterDate(quetyDate),
    queryKey: ['bookings', `last-${numDays}`]
  })
  
  return { bookings, isLoading } 
}
