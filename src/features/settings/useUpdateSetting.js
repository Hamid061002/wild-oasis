import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { updateSetting } from '../../services/apiSettings'
import { toast } from 'react-hot-toast'

export default function useUpdateSetting() {
  const queryClient = useQueryClient()

  const { mutate: updateSettingFn, isPending: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Setting successfully edited')
      queryClient.invalidateQueries({
        queryKey: ['settings']
      })
    },
    onError: err => {
      toast.error(err.message)
      console.log(err);
    }
  })
  return { updateSettingFn, isUpdating }
}
