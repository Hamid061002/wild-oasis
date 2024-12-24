import useBookings from "../features/bookings/useBookings";
import useCabins from "../features/cabins/useCabins";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import useSettings from "../features/settings/useSettings";

function Dashboard() {
  useCabins()
  useSettings()
  useBookings()

  return (
    <div className="flex flex-col gap-10 -text--color-grey-700">
      <div className="flex justify-between">
        <h1 className="text-4xl">Dashboard</h1>
        <DashboardFilter />
      </div>
      <DashboardLayout />
    </div>
  );
}

export default Dashboard;