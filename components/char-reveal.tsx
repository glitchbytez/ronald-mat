/**
 * CharReveal — server component that renders a string character
 * by character, each with a staggered animation-delay so the text
 * bleeds in like ink spreading across washi paper.
 *
 * Uses the `.char-unit` CSS class + `char-bleed` keyframe from globals.css.
 */
interface CharRevealProps {
  text: string
  /** Base delay before the first character appears (ms) */
  delay?: number
  /** Delay added per character (ms) */
  stagger?: number
  className?: string
}

export function CharReveal({
  text,
  delay   = 0,
  stagger = 55,
  className,
}: CharRevealProps) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char-unit"
          style={{ animationDelay: `${delay + i * stagger}ms` }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}
