import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { login } from '../../services/apiAuth'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: loginFn, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueryData(['user', user])
      navigate('/dashboard')
      toast.success('You successfully logged in!')
    },

    onError: (error) => {
      toast.error(error.message)
      throw new Error(error.message)
    }
  })

  return { loginFn, isLoggingIn }
}
