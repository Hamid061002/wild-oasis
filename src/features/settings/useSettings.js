import React from 'react'
import { getSettings } from '../../services/apiSettings'
import { useQuery } from '@tanstack/react-query'

export default function useSettings() {
  const { data: settings, error, isPending: isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings
  })

  return { settings, error, isLoading }
}
