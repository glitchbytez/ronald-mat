"use client"

import { useRef, type MouseEvent, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Maximum rotation in degrees (default 4) */
  maxDeg?: number
}

/**
 * TiltCard — wraps any card content in a subtle 3D perspective tilt
 * that responds to mouse position. Feels like pressing lightly on paper.
 * Springs back smoothly on mouse leave.
 */
export function TiltCard({ children, className, maxDeg = 4 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    // normalise to [-1, 1]
    const nx = ((e.clientX - left) / width  - 0.5) * 2
    const ny = ((e.clientY - top)  / height - 0.5) * 2
    el.style.transition = "transform 0.08s linear"
    el.style.transform  = `perspective(700px) rotateY(${nx * maxDeg}deg) rotateX(${-ny * maxDeg}deg)`
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    el.style.transform  = "perspective(700px) rotateX(0deg) rotateY(0deg)"
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("tilt-root", className)}
    >
      {children}
    </div>
  )
}
