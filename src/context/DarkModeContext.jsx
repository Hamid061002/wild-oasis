import { createContext, useContext, useEffect } from "react"
import { useLocalStorageState } from "../hooks/useLocalStorageState"

const Context = createContext()

export default function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
    , 'isDarkMode')

  function toggleDarkMode() {
    setIsDarkMode(e => !e)
  }

  const htmlElm = document.documentElement.classList
  useEffect(() => {
    if (isDarkMode) {
      htmlElm.add('dark-mode')
      htmlElm.remove('light-mode')
    } else {
      htmlElm.add('light-mode')
      htmlElm.remove('dark-mode')
    }

  }, [isDarkMode])

  return (
    <Context.Provider value={{
      isDarkMode,
      toggleDarkMode
    }}>
      {children}
    </Context.Provider>
  )
}

function useDarkMode() {
  const context = useContext(Context)
  if (context == undefined) throw new Error('DarkModeContext was used outside of DarkModeProvider!')
  return context
}

export { DarkModeProvider, useDarkMode }
