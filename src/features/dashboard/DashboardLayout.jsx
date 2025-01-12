import styled from "styled-components";
import useRecentBooknigs from "./useRecentBooknigs";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

export default function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBooknigs()
  const { confirmedStays, isLoading: isLoadingStays, numDays } = useRecentStays()
  const { cabins, isLoading: isLoadingCabins } = useCabins()
  

  if (isLoadingBookings || isLoadingStays || isLoadingCabins) return <Spinner />

  return (
    <div className="grid grid-cols-[auto_7fr_4fr_auto] grid-rows-[auto_24rem_auto] gap-6">
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  )
}

