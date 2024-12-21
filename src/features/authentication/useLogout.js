import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { logout } from '../../services/apiAuth'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: logoutFn, isPending: isLoggingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries()
      navigate('/login', { replace: true })
      toast.success("You successfully logged out!")
    },
    onError: error => {
      toast.error(error.message)
      throw new Error(error.message)
    }
  })

  return { logoutFn, isLoggingOut }
}
