"use client"

import { useState, useEffect } from "react"

/**
 * LiveClock — ticks every second showing the user's local time.
 * Rendered only on the client to avoid hydration mismatches.
 * The colon separator blinks subtly on each second like a cursor.
 */
export function LiveClock() {
  const [parts, setParts] = useState<{ hh: string; mm: string; ss: string } | null>(null)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const hh = now.getHours().toString().padStart(2, "0")
      const mm = now.getMinutes().toString().padStart(2, "0")
      const ss = now.getSeconds().toString().padStart(2, "0")
      setParts({ hh, mm, ss })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  if (!parts) {
    // Stable server/hydration placeholder — same width as the rendered clock
    return (
      <span className="font-mono text-[10px] tracking-widest text-muted-foreground opacity-0 select-none" aria-hidden="true">
        00·00·00
      </span>
    )
  }

  return (
    <time
      dateTime={`${parts.hh}:${parts.mm}:${parts.ss}`}
      className="font-mono text-[10px] tracking-widest text-muted-foreground opacity-35 tabular-nums select-none"
      title="Local time"
    >
      {parts.hh}
      <span className="opacity-50 animate-[soft-pulse_1s_ease-in-out_infinite]">·</span>
      {parts.mm}
      <span className="opacity-50 animate-[soft-pulse_1s_ease-in-out_infinite]">·</span>
      {parts.ss}
    </time>
  )
}
