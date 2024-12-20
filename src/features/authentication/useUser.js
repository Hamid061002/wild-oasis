import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getUser } from '../../services/apiAuth'

export default function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  })

  const isAuthenticated = Boolean(user?.role)

  return { isAuthenticated, isLoading }
}
