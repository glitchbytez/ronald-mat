"use client"

interface HankoStampProps {
  kanji?: string
  subtext?: string
  className?: string
  size?: "sm" | "md" | "lg"
}

/**
 * HankoStamp — Traditional Japanese red ink seal (判子 / ハンコ)
 * Used as a signature badge for handcrafted work.
 */
export function HankoStamp({
  kanji = "侘寂",
  subtext = "印",
  className = "",
  size = "md",
}: HankoStampProps) {
  const dimensions = {
    sm: "w-10 h-10 text-xs",
    md: "w-14 h-14 text-sm",
    lg: "w-20 h-20 text-base",
  }[size]

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center border-2 border-red-700/80 dark:border-red-600/90 text-red-700 dark:text-red-500 font-serif rounded-sm p-1 shadow-sm select-none transform -rotate-3 hover:rotate-0 transition-transform duration-300 ${dimensions} ${className}`}
      style={{
        boxShadow: "0 0 8px rgba(185, 28, 28, 0.15)",
        backgroundImage:
          "radial-gradient(circle, rgba(185,28,28,0.08) 0%, transparent 70%)",
      }}
      title="Traditional Hanko Seal"
    >
      <span className="font-bold tracking-widest leading-none opacity-90">
        {kanji}
      </span>
      {subtext && (
        <span className="text-[8px] font-mono uppercase tracking-tighter opacity-70 mt-0.5">
          {subtext}
        </span>
      )}
      {/* Weathered seal texture overlay */}
      <span className="absolute inset-0 bg-red-800/5 mix-blend-overlay pointer-events-none" />
    </div>
  )
}
