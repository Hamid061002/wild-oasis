import { useEffect, useRef } from "react"

export default function useOutsideClick(handler, listenCapturing = true, ignoreCondition = () => false) {
  const ref = useRef()



  function hanldeOutsideClick(e) {
    if (ignoreCondition(e)) return;

    if (ref.current && !ref.current.contains(e.target)) {
      handler()
    }
  }

  useEffect(() => {
    document.addEventListener('click', hanldeOutsideClick, listenCapturing)
    return () => document.removeEventListener('click', hanldeOutsideClick, listenCapturing)
  }, [hanldeOutsideClick, listenCapturing])

  return { ref }
}