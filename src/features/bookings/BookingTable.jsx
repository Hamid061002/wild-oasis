import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useBookings from "./useBookings";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, error, isLoading, count } = useBookings()
  // const [searchParams] = useSearchParams()
  // const filterValue = searchParams.get('status') || 'all'
  // let filteredBookings
  // if (filterValue == 'all') filteredBookings = bookings
  // if (filterValue == 'checked-out') filteredBookings = bookings?.filter(booking => booking.status == 'checked-out')
  // if (filterValue == 'checked-in') filteredBookings = bookings?.filter(booking => booking.status == 'checked-in')
  // if (filterValue == 'unconfirmed') filteredBookings = bookings?.filter(booking => booking.status == 'unconfirmed')


  // let sortValue = searchParams.get('sort-by') || ''
  // const isAscending = sortValue.includes('asc')
  // sortValue = isAscending ? sortValue.replace('-asc', '') : sortValue.replace('-desc', '')
  // const sortedBookings = filteredBookings?.sort((a, b) => isAscending ? a[sortValue] - b[sortValue] : b[sortValue] - a[sortValue])



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
