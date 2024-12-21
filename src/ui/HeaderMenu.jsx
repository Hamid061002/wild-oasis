import React from 'react'
import Logout from '../features/authentication/Logout'
import ButtonIcon from './ButtonIcon'
import { HiOutlineUser } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import DarkModeToggle from './DarkModeToggle'

export default function HeaderMenu() {
  const navigate = useNavigate()

  return (
    <ul className='flex items-center gap-1 -text--color-grey-700'>
      <li title='account' className='-stroke--color-grey-600 hover:-stroke--color-grey-800'>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser className='stroke-inherit' />
        </ButtonIcon>
      </li>
      <li className='-stroke--color-grey-600 hover:-stroke--color-grey-800'>
        <DarkModeToggle />
      </li>
      <li title='logout' className='-fill--color-grey-600 hover:-fill--color-grey-800'>
        <Modal>
          <Logout />
        </Modal>
      </li>
    </ul>
  )
}

