import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import Header from './Header'
import Uploader from '../data/Uploader'

const AppLayout = () => {
  return (
    <div className='grid grid-cols-[366px_1fr] grid-rows-[auto_1fr] h-screen max-w-screen-[1950px] mx-auto divide-x divide-y -divide--color-grey-100 -bg--color-grey-0'>
      <div className='row-span-2 relative'>
        <SideBar />
        <div className='fixed bottom-1 left-1 w-[250px]'>
          <Uploader />
        </div>
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
