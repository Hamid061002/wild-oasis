import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

export default function Modal({ onClose, isOpenModal, children }) {
  return createPortal(
    <div className={`flex justify-center items-center fixed inset-0 w-full h-screen -bg--backdrop-color backdrop-blur-sm z-20 transition-all duration-200`}>
      <div className="relative -bg--color-grey-0 rounded-xl shadow-lg transition-all">
        <button onClick={onClose} className="absolute top-5 right-7 p-1 rounded transition-all hover:-bg--color-grey-100"><HiXMark className="size-8" /></button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  )
}

