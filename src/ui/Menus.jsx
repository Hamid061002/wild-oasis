import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

// const Menu = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
// `;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

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
    (openId == '' || openId != id) ? openMenu(id) : closeMenu()
  }

  return <button data-toggle onClick={handleClick} className={`p-1 rounded bg-none border-none transition-all hover:-bg--color-grey-100 ${openId == id && '-bg--color-grey-100'}`}>
    {children}
  </button>
}

function List({ id, children }) {
  const { openId, closeMenu } = useContext(MenusContext)

  const ignoreCondition = (e) => e.target.closest("[data-toggle]");
  const { ref } = useOutsideClick(closeMenu, true, ignoreCondition)

  if (openId != id) return null

  return (
    <ul ref={ref} className="flex flex-col gap-1 p-1 rounded-lg absolute z-10 top-12 -bg--color-grey-0 shadow-md">
      {children}
    </ul>
  )
}

function Button({ children }) {
  return <li>
    {children}
  </li>
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button
