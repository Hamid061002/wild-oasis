import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import Header from './Header'

const AppLayout = () => {
  return (
    <div className='grid h-screen max-w-screen-2xl mx-auto grid-rows-[auto_1fr] grid-cols-[376px_1fr] divide-x divide-y -divide--color-grey-100'>
      <div className='row-span-2'>
        <SideBar />
      </div>
      <div className=''>
        <Header />
      </div>
      <main className='p-[4rem_4.4rem_6.4rem] -bg--color-grey-50 overflow-y-scroll'>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
