"use client"

import { useEffect, useRef } from "react"

/**
 * InkCursor — replaces the system cursor with a physics-based
 * two-part ink nib: a sharp dot that tracks exactly, and a ring
 * that lags behind like ink spreading on paper.
 *
 * Only renders on pointer devices (hover: hover). Falls back to
 * the system cursor on touch / coarse-pointer devices.
 */
export function InkCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseX  = useRef(0)
  const mouseY  = useRef(0)
  const ringX   = useRef(0)
  const ringY   = useRef(0)
  const rafId   = useRef<number>(0)
  const visible = useRef(false)

  useEffect(() => {
    // Only engage on pointer-capable devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
      if (!visible.current) {
        dot.style.opacity  = "1"
        ring.style.opacity = "1"
        visible.current = true
      }
    }

    const onLeave = () => {
      dot.style.opacity  = "0"
      ring.style.opacity = "0"
      visible.current = false
    }

    // Expand ring over interactive elements
    const onEnterInteractive = () => ring.classList.add("is-hovering")
    const onLeaveInteractive = () => ring.classList.remove("is-hovering")

    const interactives = document.querySelectorAll("a, button, [role='button']")
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive)
      el.addEventListener("mouseleave", onLeaveInteractive)
    })

    document.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseleave", onLeave)

    const animate = () => {
      // Dot — instant snap
      dot.style.transform = `translate(${mouseX.current - 2.5}px, ${mouseY.current - 2.5}px)`

      // Ring — lerp at 8% per frame (ink spreading lag)
      ringX.current += (mouseX.current - ringX.current) * 0.09
      ringY.current += (mouseY.current - ringY.current) * 0.09
      ring.style.transform = `translate(${ringX.current - 13}px, ${ringY.current - 13}px)`

      rafId.current = requestAnimationFrame(animate)
    }

    dot.style.opacity  = "0"
    ring.style.opacity = "0"
    rafId.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId.current)
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive)
        el.removeEventListener("mouseleave", onLeaveInteractive)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="ink-cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="ink-cursor-ring" aria-hidden="true" />
    </>
  )
}
