import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { deleteBooking } from '../../services/apiBookings'
import { toast } from 'react-hot-toast'

export default function useDeleteBooking() {
  const queryClient = useQueryClient()
  
  const { mutate: deleteBookingFn, isPending: isDeletingBooknig } = useMutation({
    mutationFn: deleteBooking,

    onSuccess: (data) => {
      toast.success(`Booknig #${data} successfully was deleted`)
      queryClient.invalidateQueries({ active: true })
    },

    onError: err => {
      toast.error('There was an error while deleting booknig!')
      console.error(err.message);
      throw new Error(err.message)
    }
  })

  return { deleteBookingFn, isDeletingBooknig }
}
