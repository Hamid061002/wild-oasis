import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { updateUser } from '../../services/apiAuth'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function useUpdateUser() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: updateUserFn, isPending: isUpdating } = useMutation({
    mutationFn: updateUser,

    onSuccess: (data) => {
      navigate('/dashboard')
      toast.success('User account successfully updated')
      queryClient.setQueryData(['user'], data?.user)
    },

    onError: err => {
      toast.error(err.message)
      console.log(err);
    }
  })
  return { updateUserFn, isUpdating }
}
