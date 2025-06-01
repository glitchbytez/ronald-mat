"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light"
    setTheme(newTheme)

    // Immediately apply theme to prevent flash
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
      document.documentElement.style.colorScheme = "dark"
    } else {
      document.documentElement.classList.remove("dark")
      document.documentElement.style.colorScheme = "light"
    }
  }

  if (!mounted) {
    return (
      <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <div className="w-4 h-4" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "light" ? (
        <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      ) : (
        <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  )
}
