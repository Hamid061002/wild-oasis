import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

// const StyledModal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: var(--color-grey-0);
//   border-radius: var(--border-radius-lg);
//   box-shadow: var(--shadow-lg);
//   padding: 3.2rem 4rem;
//   transition: all 0.5s;
// `;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   background-color: var(--backdrop-color);
//   backdrop-filter: blur(4px);
//   z-index: 1000;
//   transition: all 0.5s;
// `;

// const Button = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;
//   position: absolute;
//   top: 1.2rem;
//   right: 1.9rem;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     /* Sometimes we need both */
//     /* fill: var(--color-grey-500);
//     stroke: var(--color-grey-500); */
//     color: var(--color-grey-500);
//   }
// `;
const ModalContext = createContext()

export default function Modal({ children }) {
  const [openName, setOpenName] = useState('')
  const closeModal = () => setOpenName('')
  const openModal = setOpenName

  return <ModalContext.Provider value={{ openName, closeModal, openModal }}>
    {children}
  </ModalContext.Provider>
}

function Open({ children, opens: openWindowName }) {
  const { openModal } = useContext(ModalContext)

  return cloneElement(children, { onClick: () => openModal(openWindowName) })
}

function Window({ children, name }) {
  const { openName, closeModal } = useContext(ModalContext)

  const { ref } = useOutsideClick(closeModal, true)
  // useEffect(() => {
  //   function hanldeOutsideCLick(e) {
  //     if (ref.current && !ref.current.contains(e.target)) {
  //       closeModal()
  //     }
  //   }

  //   document.addEventListener('click', hanldeOutsideCLick, true)

  //   return () => document.removeEventListener('click', hanldeOutsideCLick, true)
  // }, [closeModal])

  if (openName !== name) return null

  return createPortal(
    <div className={`flex justify-center items-center fixed inset-0 w-full h-screen -bg--backdrop-color backdrop-blur-sm z-20 transition-all duration-200`}>
      <div ref={ref} className="relative -bg--color-grey-0 rounded-xl shadow-lg transition-all">
        <button onClick={closeModal} className="absolute top-5 right-7 p-1 rounded transition-all hover:-bg--color-grey-100"><HiXMark className="size-8" /></button>
        <div>{cloneElement(children, { onCloseModal: () => closeModal(openName) })}</div>
      </div>
    </div>,
    document.body
  )
}

Modal.Open = Open
Modal.Window = Window

