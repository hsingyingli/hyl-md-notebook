import React, { createContext, useState, useEffect } from 'react'
import Loading from '../components/Loading'

interface Props {
  children: React.ReactNode
}

interface ThemeContextInterface {
  theme: string | null
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextInterface>({
  theme: null,
  toggleTheme: () => { }
})



const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme')
    }

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }

    return 'light'
  })

  const toggleTheme = () => {
    const t = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', t)
    setTheme(t)
  }

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }
    document.documentElement.setAttribute('data-color-mode', theme || "dark")
    document.documentElement.style.colorScheme = theme || 'dark'
    document.documentElement.style.backgroundColor = theme === 'dark' ? 'black' : '#FEFBEB'

    setIsLoading(false)
  }, [theme])

  return isLoading ?
    <Loading />
    : (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    )
}

export default ThemeProvider

export {
  ThemeContext
}
