"use client"

interface TategakiBannerProps {
  primary: string
  kanji: string
  subtext?: string
}

/**
 * Vertical text banner (縦書き - Tategaki)
 * Traditional Japanese right-to-left vertical alignment block.
 */
export function TategakiBanner({ primary, kanji, subtext }: TategakiBannerProps) {
  return (
    <div className="flex items-center gap-4 py-3 px-4 border-l-2 border-red-700/60 dark:border-red-600/60 bg-card/40 backdrop-blur-sm rounded-r-sm my-6">
      {/* Kanji vertically written */}
      <div className="[writing-mode:vertical-rl] font-display text-2xl tracking-widest text-foreground opacity-90 select-none">
        {kanji}
      </div>

      <div className="flex flex-col">
        <span className="font-display text-sm font-normal text-foreground/90">
          {primary}
        </span>
        {subtext && (
          <span className="font-mono text-xs text-muted-foreground opacity-60 mt-0.5">
            {subtext}
          </span>
        )}
      </div>
    </div>
  )
}
