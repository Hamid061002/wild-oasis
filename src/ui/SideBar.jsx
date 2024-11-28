import React from 'react'
import Logo from './Logo'
import MainNav from './MainNav'

const SideBar = () => {
  return (
    <aside className='py-[3.2rem] px-[2.4rem]'>
      <Logo />
      <MainNav />
    </aside>
  )
}

export default SideBar
