import React from 'react'
import ButtonIcon from '../../ui/ButtonIcon'
import SpinnerMini from '../../ui/SpinnerMini'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import useLogout from './useLogout'
import Modal from '../../ui/Modal'
import ConfirmLogout from '../../ui/ConfirmLogout'
import useUser from './useUser'

export default function Logout() {
  const { logoutFn, isLoggingOut } = useLogout()
  const { user } = useUser()

  function handlelogout() {
    logoutFn()
  }

  if (isLoggingOut) return <SpinnerMini />

  return (<>

    <Modal.Open opens='logout'>
      <ButtonIcon>
        <HiArrowRightOnRectangle className='fill-inherit' />
      </ButtonIcon>
    </Modal.Open>
    <Modal.Window name='logout'>
      <ConfirmLogout disabled={isLoggingOut} onConfirm={handlelogout} resourceName={user.user_metadata.fullName} />
    </Modal.Window>
  </>

  )
}
