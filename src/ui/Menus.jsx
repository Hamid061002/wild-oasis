import { createContext, useContext, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

const MenusContext = createContext()

export default function Menus({ children }) {
  const [openId, setOpenId] = useState('')
  const closeMenu = () => setOpenId('')
  const openMenu = setOpenId

  return (
    <MenusContext.Provider value={{ openId, closeMenu, openMenu }}>
      {children}
    </MenusContext.Provider>
  )
}

function Menu({ children }) {
  return <div className="flex items-center justify-end relative">{children}</div>
}

function Toggle({ id, children }) {
  const { openId, closeMenu, openMenu } = useContext(MenusContext)

  function handleClick(e) {
    e.stopPropagation();
    (openId == '' || openId != id) ? openMenu(id) : closeMenu()
  }

  return <button data-toggle onClick={handleClick} className={`p-1 rounded bg-none border-none transition-all hover:-bg--color-grey-100 ${openId == id && '-bg--color-grey-100'}`}>
    {children}
  </button>
}

function List({ id, children, className }) {
  const { openId, closeMenu } = useContext(MenusContext)

  // const ignoreCondition = (e) => e.target.closest("[data-toggle]");
  // const { ref } = useOutsideClick(closeMenu, false, ignoreCondition)
  const { ref } = useOutsideClick(closeMenu, false)

  if (openId != id) return null

  return (
    <ul ref={ref} className={`flex flex-col rounded-lg absolute z-10 -bg--color-grey-0 shadow-md ${className ? className : 'gap-1 p-1 top-12'}`}>
      {children}
    </ul>
  )
}

function Button({ children, className }) {
  return <li className={className}>
    {children}
  </li>
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button
