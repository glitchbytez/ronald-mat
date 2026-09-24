import Link from "next/link"
import projectsData from "@/data/projects.json"
import articlesData from "@/data/articles.json"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CharReveal }    from "@/components/char-reveal"
import { SkillsTicker }  from "@/components/skills-ticker"
import { TiltCard }      from "@/components/tilt-card"
import { ScrollFade }    from "@/components/scroll-fade"

export default function Home() {
  const featuredProjects = projectsData.projects.filter((p) => p.featured)
  const recentArticles = articlesData.articles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  // Character counts for staggered delays across all three lines
  // "Building " = 9 chars, "secure" = 6 chars, "systems." = 8 chars
  const line1Delay = 350
  const line2Delay = line1Delay + 9 * 55 + 120   // after line 1 + pause
  const line3Delay = line2Delay + 6 * 55 + 120   // after line 2 + pause

  return (
    <main className="flex flex-col px-8 max-w-5xl mx-auto w-full">

      {/* ══════════════════════════════════════
          HERO
          ══════════════════════════════════════ */}
      <section className="mb-4 pt-14 relative" aria-label="Introduction">

        {/* Live "currently building" status pill */}
        <div className="flex items-center gap-2.5 mb-14 animate-wabi-in">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-foreground opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground opacity-70" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground opacity-50">
            currently building
          </span>
        </div>

        {/* Character-by-character headline — ink bleeds in per letter */}
        <h1
          className="font-display text-[clamp(3.5rem,10vw,8rem)] font-normal leading-[1.02] tracking-wide mb-0"
          aria-label="Building secure systems."
        >
          <CharReveal text="Building" delay={line1Delay} stagger={55} />
          <br />
          <em>
            <CharReveal text="secure" delay={line2Delay} stagger={55} />
          </em>
          <br />
          <CharReveal text="systems." delay={line3Delay} stagger={55} />
        </h1>

        {/* Brushstroke rule — draws in after text finishes */}
        <div
          className="line-draw h-px bg-border/50 mt-12 mb-10"
          aria-hidden="true"
        />

        {/* Tagline fades in last */}
        <p
          className="font-sans text-lg text-muted-foreground max-w-lg leading-[1.85] font-light"
          style={{ opacity: 0, animation: `wabi-appear 1.2s ease-in ${line3Delay + 8 * 55 + 300}ms forwards` }}
        >
          Junior software developer with a focus on cybersecurity,
          network analysis, and building resilient web applications.
        </p>
      </section>

      {/* ══════════════════════════════════════
          SKILLS TICKER
          ══════════════════════════════════════ */}
      <SkillsTicker />

      {/* ══════════════════════════════════════
          MAIN GRID
          ══════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">

        {/* ── Column 1: Building Now ── */}
        <ScrollFade className="md:col-span-4" delay={100}>
          <div className="space-y-7">
            <h2 className="font-display text-sm italic opacity-55 border-b border-border/35 pb-3">
              building now
            </h2>

            <TiltCard>
              <Card className="bg-card/70 border-border/35 hover:border-border/60 transition-colors duration-500">
                <CardHeader>
                  <div className="flex items-center justify-between mb-1">
                    <CardTitle className="text-base">Network Scanner</CardTitle>
                    {/* Inline "in progress" badge */}
                    <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground opacity-35 border border-border/40 px-1.5 py-0.5 rounded-[2px]">
                      WIP
                    </span>
                  </div>
                  <CardDescription>Rust-based port scanner with service detection.</CardDescription>
                </CardHeader>
              </Card>
            </TiltCard>

            <TiltCard>
              <Card className="bg-card/70 border-border/35 hover:border-border/60 transition-colors duration-500">
                <CardHeader>
                  <div className="flex items-center justify-between mb-1">
                    <CardTitle className="text-base">Secure Chat</CardTitle>
                    <span className="font-mono text-[9px] tracking-widest uppercase text-muted-foreground opacity-35 border border-border/40 px-1.5 py-0.5 rounded-[2px]">
                      WIP
                    </span>
                  </div>
                  <CardDescription>E2E encrypted messaging using Signal protocol.</CardDescription>
                </CardHeader>
              </Card>
            </TiltCard>
          </div>
        </ScrollFade>

        {/* ── Column 2: Selected Work ── */}
        <ScrollFade className="md:col-span-4" delay={220}>
          <div className="space-y-7">
            <h2 className="font-display text-sm italic opacity-55 border-b border-border/35 pb-3">
              selected work
            </h2>
            <div>
              {featuredProjects.map((project) => (
                <Link key={project.id} href={project.github} target="_blank" className="block group">
                  <div className="py-4 border-b border-border/20 flex items-baseline justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-display font-normal text-base opacity-80 group-hover:opacity-100 group-hover:italic transition-all duration-500 mb-0.5">
                        {project.name}
                      </h3>
                      <p className="font-sans text-xs text-muted-foreground font-light leading-relaxed opacity-65 line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                    <span className="text-muted-foreground opacity-20 group-hover:opacity-60 transition-opacity duration-500 shrink-0 text-sm">
                      ↗
                    </span>
                  </div>
                </Link>
              ))}
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-[0.15em] uppercase text-muted-foreground opacity-35 hover:opacity-70 transition-opacity duration-500 mt-6"
              >
                all projects →
              </Link>
            </div>
          </div>
        </ScrollFade>

        {/* ── Column 3: Recent Writing ── */}
        <ScrollFade className="md:col-span-4" delay={340}>
          <div className="space-y-7">
            <h2 className="font-display text-sm italic opacity-55 border-b border-border/35 pb-3">
              recent writing
            </h2>
            <div>
              {recentArticles.map((article) => (
                <Link key={article.id} href={`/writing/${article.slug}`} className="block group">
                  <div className="py-4 border-b border-border/20 flex justify-between items-baseline gap-4">
                    <h3 className="font-display font-normal text-sm leading-snug opacity-75 group-hover:opacity-100 group-hover:italic transition-all duration-500">
                      {article.title}
                    </h3>
                    <span className="font-mono text-[10px] text-muted-foreground shrink-0 opacity-35">
                      {new Date(article.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </Link>
              ))}
              <Link
                href="/writing"
                className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-[0.15em] uppercase text-muted-foreground opacity-35 hover:opacity-70 transition-opacity duration-500 mt-6"
              >
                all writing →
              </Link>
            </div>
          </div>
        </ScrollFade>

      </div>

    </main>
  )
}
