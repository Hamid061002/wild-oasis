import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { deleteCabin } from '../../services/apiCabin'
import toast from 'react-hot-toast'

export default function useDeleteCabin() {
  const queryClient = useQueryClient()

  const { mutate: deleteCabinFn, isPending: isDeleting } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success('Cabin successfully deleted')
      queryClient.invalidateQueries({
        queryKey: ['cabin']
      })
    },
    onError: err => toast.error(err.message)
  })

  return { deleteCabinFn, isDeleting }
}
