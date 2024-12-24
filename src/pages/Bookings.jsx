import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Heading from "../ui/Heading";

function Bookings() {
  return (
    <div className="flex flex-col gap-10 -text--color-grey-700">
      <div className="flex justify-between items-center -text--color-grey-700">
        <h1 className="text-4xl">All bookings</h1>
        <BookingTableOperations />
      </div>
      <BookingTable />
    </div>
  );
}

export default Bookings;
