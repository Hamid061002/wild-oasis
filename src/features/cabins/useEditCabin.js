import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { editCabin } from '../../services/apiCabin'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'

export default function useEditCabin() {
  const queryClient = useQueryClient()

  const { mutate: editCabinFn, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => editCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited')
      queryClient.invalidateQueries({
        queryKey: ['cabin']
      })
    },
    onError: err => {
      toast.error(err.message)
      console.log(err);
    }
  })
  return { editCabinFn, isEditing }
}
