import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { createCabin } from '../../services/apiCabin'
import toast from 'react-hot-toast'

export default function useCreateCabin() {
  const queryClient = useQueryClient()

  const { mutate: createCabinFn, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created')
      queryClient.invalidateQueries({
        queryKey: ['cabin']
      })      
    },
    onError: err => {
      toast.error(err.message)
      console.log(err);
    }
  })
  return { createCabinFn, isCreating }
}
