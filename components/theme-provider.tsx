"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  useEffect(() => {
    // Ensure theme is applied immediately on client-side navigation
    const applyTheme = () => {
      try {
        const theme = localStorage.getItem("theme")
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const isDark = theme === "dark" || (theme === "system" && systemDark) || (!theme && systemDark)

        if (isDark) {
          document.documentElement.classList.add("dark")
          document.documentElement.style.colorScheme = "dark"
        } else {
          document.documentElement.classList.remove("dark")
          document.documentElement.style.colorScheme = "light"
        }
      } catch (e) {}
    }

    applyTheme()
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
