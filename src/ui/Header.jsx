import React from 'react'
import Logout from '../features/authentication/Logout'

const Header = () => {
  return (
    <div className='flex justify-between p-[1.2rem_4.4rem]'>
      <span>Header</span>
      <Logout />
    </div>
  )
}

export default Header
