import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import useOutsideClick from "../hooks/useOutsideClick";

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

  if (openName !== name) return null

  return createPortal(
    <div className="flex justify-center items-center fixed inset-0 w-full h-screen -bg--backdrop-color backdrop-blur-sm z-20 transition-all duration-200 -text--color-grey-700">
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

