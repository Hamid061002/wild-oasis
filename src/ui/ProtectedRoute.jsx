import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import useUser from '../features/authentication/useUser'
import { toast } from 'react-hot-toast'

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate()

  const { isAuthenticated, isLoading } = useUser()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login')
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading) return <Spinner />

  if (isAuthenticated) {
    return children
  } 
}
