/**
 * SkillsTicker — a pure-CSS infinite horizontal marquee showing
 * the technology stack. Items are duplicated so the loop is seamless.
 * No JavaScript required.
 */
const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "CSS",
  "WebSockets",
  "Node.js",
  "Rust",
  "Python",
  "TCP/IP",
  "Linux",
  "Nmap",
  "Wireshark",
  "Docker",
  "TLS/SSL",
  "OpenSSL",
  "PostgreSQL",
  "JWT",
  "REST APIs",
]

const SEP = "·"

export function SkillsTicker() {
  // Double the list for a seamless loop
  const items = [...SKILLS, ...SKILLS]

  return (
    <div
      className="w-full overflow-hidden border-y border-border/20 py-4 my-10"
      aria-label="Technology stack"
    >
      <div
        className="ticker-track flex gap-8 whitespace-nowrap w-max"
        aria-hidden="true"
      >
        {items.map((skill, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground opacity-45">
              {skill}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground opacity-20">
              {SEP}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
