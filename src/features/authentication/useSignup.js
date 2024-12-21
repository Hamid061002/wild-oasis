import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { signup } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export default function useSignup() {
  const navigate = useNavigate()

  const { mutate: signupFn, isPending: isSigningUp } = useMutation({
    mutationFn: ({ fullName, email, password }) => signup({ fullName, email, password }),

    onSuccess: () => {
      navigate('/dashboard')
      toast.success('Account successfully created! Please verify the new account from the user\'s email address!')
    },

    // onError: error => {
    //   toast.error(error.message)
    //   console.error(error.message);
    //   throw new Error(error.message)
    // }
  })

  return { signupFn, isSigningUp }
}
