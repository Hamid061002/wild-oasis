import React from 'react'
import ButtonIcon from '../../ui/ButtonIcon'
import SpinnerMini from '../../ui/SpinnerMini'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import useLogout from './useLogout'

export default function Logout() {
  const { logoutFn, isLoggingOut } = useLogout()
  
  function handlelogout() {
    logoutFn()
  }

  if (isLoggingOut) return <SpinnerMini />

  return (
    <ButtonIcon onClick={handlelogout} className='flex items-center -text--color-grey-700'>
      <span>LogOut</span>
      <HiArrowRightOnRectangle className='flex-none max-w-7 fill-inherit' />
    </ButtonIcon>
  )
}
