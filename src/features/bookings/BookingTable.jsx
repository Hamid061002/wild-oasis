import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useBookings from "./useBookings";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, isLoading, count } = useBookings()

  if (isLoading) return <Spinner />

  return (
    <Menus>
      <Table columns={`0.6fr 1.8fr 2.4fr 1.4fr 1.4fr 4rem`}>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        {count > 10 && <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>}
      </Table>
    </Menus>
  );
}

export default BookingTable;
