import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiMiniTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";

function BookingDetail() {
  const { booking = {}, error, isLoading } = useBooking()
  const { deleteBookingFn, isDeletingBooknig } = useDeleteBooking()
  const navigate = useNavigate()
  const { checkoutFn, isCheckingOut } = useCheckout()

  const { status, id: bookingId } = booking;

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleCheckout() {
    if (status == 'checked-in') checkoutFn(bookingId)
    return
  }

  if (error) return <div>{error.message}</div>
  if (isLoading || isCheckingOut) return <Spinner />

  return (
    <div className="flex flex-col gap-6 -text--color-grey-700">
      <div className="flex justify-between">
        <div className="flex items-center gap-9">
          <h1 className="text-4xl">Booking #{bookingId}</h1>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </div>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </div>

      <BookingDataBox booking={booking} />

      <div className="flex gap-4 justify-end">
        <Modal>
          <Modal.Open opens='delete-booking'>
            <button
              className="flex items-center gap-2 w-fit px-3 py-2 -bg--color-red-700 text-white hover:-bg--color-red-800 transitionOptimized rounded-md text-base">
              <HiMiniTrash className="flex-none" size={20} />
              <span className="text-nowrap">Delete</span>
            </button>
          </Modal.Open>
          <Modal.Window name='delete-booking'>
            <ConfirmDelete
              disabled={isDeletingBooknig}
              resourceName='booking'
              onConfirm={() => deleteBookingFn(bookingId, {
                onSettled: () => {
                  navigate('/bookings')
                }
              })}
            />
          </Modal.Window>
        </Modal>
        {
          status == 'checked-in' &&
          <button
            onClick={handleCheckout}
            className="flex items-center gap-2 w-fit px-3 py-2 -bg--color-brand-500 text-white hover:-bg--color-brand-600 transition-all duration-200 rounded-md text-base">
            <HiArrowUpOnSquare className="flex-none" size={20} />
            <span className="text-nowrap">Check out</span>
          </button>
        }
        {
          status == 'unconfirmed' &&
          <button
            onClick={() => navigate(`/checkin/${bookingId}`)}
            className="flex items-center gap-2 w-fit px-3 py-2 -bg--color-brand-500 text-white hover:-bg--color-brand-600 transition-all duration-200 rounded-md text-base">
            <HiArrowDownOnSquare className="flex-none" size={20} />
            <span className="text-nowrap">Check in</span>
          </button>
        }
        <button className="py-2 px-4 rounded-md -bg--color-grey-0 border -border--color-grey-200 hover:-bg--color-grey-50 text-xl font-medium" onClick={moveBack}>
          Back
        </button>
      </div>

    </div>
  );
}

export default BookingDetail;
