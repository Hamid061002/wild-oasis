import useBookings from "../features/bookings/useBookings";
import useCabins from "../features/cabins/useCabins";
import useSettings from "../features/settings/useSettings";

function Dashboard() {
  useCabins()
  useSettings()
  useBookings()

  return (
    <div>
      Dashboard
      {/* <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <p>TEST</p>
    </Row> */}
    </div>
  );
}

export default Dashboard;