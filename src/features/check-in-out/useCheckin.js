import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { updateBooking } from '../../services/apiBookings'

export default function useCheckin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: checkinFn, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfastObj }) => updateBooking(bookingId, {
      status: 'checked-in',
      isPaid: true,
      ...breakfastObj,
    }),

    onSuccess: (data) => {
      const { id: bookingId } = data
      toast.success(`Booking #${bookingId} successfully checked in`)
      queryClient.invalidateQueries({ active: true })
      navigate('/bookings')
    },

    onError: error => {
      toast.error('There was an error while checking in!')
      console.error(error.message);
      throw new Error(error.message)
    }
  })

  return { checkinFn, isCheckingIn }
}
