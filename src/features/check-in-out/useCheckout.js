import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { updateBooking } from '../../services/apiBookings'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function useCheckout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: checkoutFn, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) => updateBooking(bookingId, { status: 'checked-out' }),

    onSuccess: (data) => {
      const { id: bookingId } = data
      toast.success(`Booking #${bookingId} successfully checked out`)
      queryClient.invalidateQueries({ active: true })
      navigate('/bookings')
    },

    onError: error => {
      toast.error('There was an error while checking out!')
      console.error(error.message);
      throw new Error(error.message)
    }
  })

  return { checkoutFn, isCheckingOut }
}
