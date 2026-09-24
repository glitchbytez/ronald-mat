"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollFadeProps {
  children: ReactNode
  /** Delay before revealing after intersection fires (ms) */
  delay?: number
  className?: string
}

/**
 * ScrollFade — uses IntersectionObserver to reveal children
 * as they scroll into view. Adds the `.reveal-visible` class
 * which triggers the CSS transition defined in globals.css.
 *
 * Falls back gracefully if IntersectionObserver is unavailable.
 */
export function ScrollFade({ children, delay = 0, className }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!("IntersectionObserver" in window)) {
      // Fallback: just show immediately
      el.classList.remove("reveal-hidden")
      el.classList.add("reveal-visible")
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.remove("reveal-hidden")
            el.classList.add("reveal-visible")
          }, delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.08 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`reveal-hidden ${className ?? ""}`}>
      {children}
    </div>
  )
}
