import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2rem 4rem;
`;

function CheckinBooking() {
  const { bookingId } = useParams()
  const moveBack = useMoveBack();

  const { booking = {}, error, isLoading } = useBooking()
  const { checkinFn, isCheckingIn } = useCheckin()
  const { settings, isLoading: isLoadingSetting } = useSettings()

  const { guests, isPaid, totalPrice, hasBreakfast, numGuests, numNights } = booking;

  const optionalBreakfastPrice = settings?.breakfastPrice * numNights * numGuests

  const [confirmedPaid, setConfirmedPaid] = useState(false)
  const [addBreakfast, setAddBreakfast] = useState(false)


  useEffect(() => {
    setConfirmedPaid(isPaid ? true : false)
    setAddBreakfast(hasBreakfast ? true : false)
  }, [isPaid, hasBreakfast])

  function handleCheckin() {
    if (!confirmedPaid) return
    if (addBreakfast) {
      checkinFn({
        bookingId, breakfastObj:
        {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice
        }
      })
    } else {
      checkinFn({ bookingId, breakfastObj: {} })
    }
  }

  if (isLoading || isLoadingSetting) return <Spinner />

  return (
    <div className="flex flex-col gap-6 -text--color-grey-700">
      <div className="flex justify-between">
        <h1 className="text-4xl">Check in booking #{bookingId}</h1>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </div>

      <BookingDataBox booking={booking} />

      {
        !hasBreakfast &&
        <Box>
          <Checkbox
            id={bookingId}
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast(e => !e)
              setConfirmedPaid(false)
            }}
          >
            Want to add breakfast fow {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      }

      <Box>
        <Checkbox
          id={bookingId}
          checked={confirmedPaid}
          onChange={() => setConfirmedPaid(e => !e)}
          disabled={confirmedPaid}
        >
          I confirmed that {guests.fullName} has paid the total amount of {!addBreakfast ? formatCurrency(totalPrice) :
            `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${(formatCurrency(totalPrice))} + ${(formatCurrency(optionalBreakfastPrice))})`
          }
        </Checkbox>
      </Box>

      <div className="flex gap-4 justify-end">
        <button
          disabled={!confirmedPaid || isCheckingIn}
          className="flex items-center gap-2 w-fit px-3 py-2 -bg--color-brand-500 text-white hover:-bg--color-brand-600 transition-all duration-200 disabled:opacity-40 disabled:hover:-bg--color-brand-500 rounded-md text-base"
          onClick={handleCheckin}>Check in booking #{bookingId}</button>
        <button className="py-2 px-4 rounded-md -bg--color-grey-0 border -border--color-grey-200 hover:-bg--color-grey-50 text-xl font-medium" onClick={moveBack}>Back</button>
      </div>
    </div>
  );
}

export default CheckinBooking;
