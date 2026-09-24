import Link from "next/link"
import toolsData from "@/data/tools.json"
import { ScrollFade } from "@/components/scroll-fade"
import { TiltCard } from "@/components/tilt-card"

export default function CraftPage() {
  return (
    <main className="flex flex-col px-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <ScrollFade className="mb-20 pt-8">
        <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase mb-4 block opacity-60">
          Tools & Instruments
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-normal tracking-wide mb-6">
          Craft
        </h1>
        <p className="font-sans italic text-muted-foreground text-lg max-w-2xl font-light leading-relaxed">
          Custom penetration testing, security utilities, and internal tools built for specific research needs.
        </p>
      </ScrollFade>

      <div className="space-y-20">
        {toolsData.categories.map((category) => (
          <section key={category.name}>
            <ScrollFade>
              <div className="flex justify-between items-baseline border-b border-border/30 pb-3 mb-8">
                <h2 className="font-display text-sm italic opacity-60">
                  {category.name.toLowerCase()}
                </h2>
                <span className="font-mono text-[11px] text-muted-foreground opacity-40">
                  [{category.tools.length} tools]
                </span>
              </div>
            </ScrollFade>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.tools.map((tool, index) => (
                <ScrollFade key={tool.name} delay={index * 80}>
                  <Link
                    href={tool.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group h-full"
                  >
                    <TiltCard className="p-7 h-full flex flex-col justify-between border border-border/25 hover:border-border/60 transition-colors duration-300 rounded-sm">
                      <div>
                        <div className="flex justify-between items-baseline mb-3">
                          <h3 className="font-display font-normal text-xl opacity-90 group-hover:italic group-hover:opacity-100 transition-all duration-300">
                            {tool.name}
                          </h3>
                          <span className="font-mono text-xs text-muted-foreground opacity-30 group-hover:opacity-80 transition-opacity ml-4 shrink-0">
                            ↗
                          </span>
                        </div>
                        <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </TiltCard>
                  </Link>
                </ScrollFade>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
