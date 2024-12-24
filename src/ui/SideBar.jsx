import React from 'react'
import Logo from './Logo'
import MainNav from './MainNav'
import { Link } from 'react-router-dom'
import Uploader from '../data/Uploader'

const SideBar = () => {
  return (
    <aside className='pt-[3.2rem] px-[2rem]'>
      <Link to='dashboard'><Logo /></Link>
      <MainNav />
    </aside>
  )
}

export default SideBar
