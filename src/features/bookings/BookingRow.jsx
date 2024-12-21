import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEllipsisVertical, HiEye, HiMiniTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-size: 1.15rem;
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 0.95rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { checkoutFn, isCheckingOut } = useCheckout()
  const { deleteBookingFn, isDeletingBooknig } = useDeleteBooking()
  const navigate = useNavigate()

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <div className="justify-self-end">

        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={bookingId}><HiEllipsisVertical size={24} /></Menus.Toggle>
            <Menus.List className='p-1 gap-1 top-9' id={bookingId}>
              <Menus.Button className='w-full'>
                <button
                  onClick={() => navigate(`/bookings/${bookingId}`)}
                  className="flex items-center gap-2 w-full px-3 py-2 hover:-bg--color-grey-100 transitionOptimized rounded-md text-base">
                  <HiEye className="flex-none" size={20} />
                  <span className="text-nowrap">See details</span>
                </button>
              </Menus.Button>
              {status == 'unconfirmed' && <Menus.Button className='w-full'>
                <button
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                  className="flex items-center gap-2 w-full px-3 py-2 hover:-bg--color-grey-100 transitionOptimized rounded-md text-base">
                  <HiArrowDownOnSquare className="flex-none" size={20} />
                  <span className="text-nowrap">Check in</span>
                </button>
              </Menus.Button>}
              {status == 'checked-in' && <Menus.Button className='w-full'>
                <button
                  disabled={isCheckingOut}
                  onClick={() => status == 'checked-in' && checkoutFn(bookingId)}
                  className="flex items-center gap-2 w-full px-3 py-2 hover:-bg--color-grey-100 disabled:opacity-50 transitionOptimized rounded-md text-base">
                  <HiArrowUpOnSquare className="flex-none" size={20} />
                  <span className="text-nowrap">Check out</span>
                </button>
              </Menus.Button>}
              <Menus.Button>
                <Modal.Open opens='delete-cabin'>
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 -bg--color-red-700 text-white hover:-bg--color-red-800 disabled:opacity-50 transitionOptimized rounded-md text-base"
                  ><HiMiniTrash />Delete</button>
                </Modal.Open>
              </Menus.Button>
            </Menus.List>
            <Modal.Window name='delete-cabin'>
              <ConfirmDelete disabled={isDeletingBooknig} resourceName='booking' onConfirm={() => deleteBookingFn(bookingId)} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default BookingRow;
