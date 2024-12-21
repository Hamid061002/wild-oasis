import React, { useEffect, useState } from 'react'
import ButtonIcon from './ButtonIcon'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { useDarkMode } from '../context/DarkModeContext'

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {
        isDarkMode ?
          <HiOutlineSun className='stroke-inherit' /> :
          <HiOutlineMoon className='stroke-inherit' />
      }
    </ButtonIcon>
  )
}
