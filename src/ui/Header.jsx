import React from 'react'
import Logout from '../features/authentication/Logout'
import HeaderMenu from './HeaderMenu'
import { Avatar, StyledUserAvatar } from '../features/authentication/UserAvatar'
import useUser from '../features/authentication/useUser'

const Header = () => {
  const { user } = useUser()
  const { fullName, avatar } = user.user_metadata

  return (
    <div className='flex justify-between p-[1.2rem_4.4rem]'>
      <StyledUserAvatar>
        <Avatar src={avatar || 'default-user.jpg'} alt={`Avatar of ${fullName}`} />
        <span className='-text--color-grey-700'>{fullName}</span>
      </StyledUserAvatar>
      <HeaderMenu />
    </div>
  )
}

export default Header
