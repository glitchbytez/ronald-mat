import Link from "next/link"
import projectsData from "@/data/projects.json"
import articlesData from "@/data/articles.json"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CharReveal }    from "@/components/char-reveal"
import { SkillsTicker }  from "@/components/skills-ticker"
import { TiltCard }      from "@/components/tilt-card"
import { ScrollFade }    from "@/components/scroll-fade"
import { HankoStamp }    from "@/components/hanko-stamp"
import { TategakiBanner } from "@/components/tategaki-banner"

export default function Home() {
  const featuredProjects = projectsData.projects.filter((p) => p.featured)
  const recentArticles = articlesData.articles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  const line1Delay = 350
  const line2Delay = line1Delay + 9 * 55 + 120
  const line3Delay = line2Delay + 6 * 55 + 120

  return (
    <main className="flex flex-col px-8 max-w-5xl mx-auto w-full">

      {/* ══════════════════════════════════════
          HERO — AUTHENTIC JAPANESE WABI-SABI
          ══════════════════════════════════════ */}
      <section className="mb-8 pt-10 relative" aria-label="Introduction">

        <div className="flex items-center justify-between gap-4 mb-8 animate-wabi-in">
          {/* Status Badge with Red Vermillion Dot */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground opacity-70">
              currently building • 制作中
            </span>
          </div>

          {/* Master Hanko Stamp */}
          <HankoStamp kanji="無常" subtext="Impermanence" size="md" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Main Headline */}
          <div className="md:col-span-9">
            <h1
              className="font-display text-[clamp(3rem,8vw,6.5rem)] font-normal leading-[1.05] tracking-wide mb-4"
              aria-label="Building secure systems."
            >
              <CharReveal text="Building" delay={line1Delay} stagger={55} />
              <br />
              <em className="text-primary not-italic font-normal">
                <CharReveal text="secure" delay={line2Delay} stagger={55} />
              </em>
              <br />
              <CharReveal text="systems." delay={line3Delay} stagger={55} />
            </h1>
          </div>

          {/* Vertical Tategaki Calligraphy Column */}
          <div className="hidden md:flex md:col-span-3 justify-end pt-4">
            <div className="[writing-mode:vertical-rl] font-display text-4xl tracking-[0.3em] text-foreground/30 select-none border-r border-primary/40 pr-4">
              不完全の美・侘寂
            </div>
          </div>
        </div>

        {/* Brushstroke Rule */}
        <div
          className="line-draw h-0.5 bg-primary/60 mt-10 mb-8"
          aria-hidden="true"
        />

        {/* Japanese Philosophy Subtext */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <p
              className="font-sans text-lg text-muted-foreground max-w-xl leading-relaxed font-light"
              style={{ opacity: 0, animation: `wabi-appear 1.2s ease-in ${line3Delay + 8 * 55 + 300}ms forwards` }}
            >
              Junior software developer & UI engineer with a dedication to cybersecurity,
              network analysis, and crafting restrained, resilient web applications.
            </p>
          </div>
          <div className="md:col-span-4">
            <TategakiBanner
              kanji="堅牢"
              primary="Resilient Architecture"
              subtext="Focusing on zero-trust and simplicity"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SKILLS TICKER
          ══════════════════════════════════════ */}
      <div className="my-8">
        <SkillsTicker />
      </div>

      {/* ══════════════════════════════════════
          MAIN GRID
          ══════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-24">

        {/* ── Column 1: Building Now (現在制作中) ── */}
        <ScrollFade className="md:col-span-4" delay={100}>
          <div className="space-y-6">
            <div className="flex items-baseline justify-between border-b border-border/40 pb-2">
              <h2 className="font-display text-base font-normal tracking-wide text-foreground">
                building now
              </h2>
              <span className="font-display text-xs text-primary opacity-80">
                制作中
              </span>
            </div>

            <TiltCard>
              <Card className="bg-card/70 border-border/40 hover:border-primary/50 transition-colors duration-500">
                <CardHeader>
                  <div className="flex items-center justify-between mb-1">
                    <CardTitle className="text-base font-normal">Network Scanner</CardTitle>
                    <span className="font-mono text-[9px] tracking-widest uppercase text-primary border border-primary/40 px-1.5 py-0.5 rounded-[2px]">
                      WIP
                    </span>
                  </div>
                  <CardDescription>Rust-based port scanner with service detection.</CardDescription>
                </CardHeader>
              </Card>
            </TiltCard>

            <TiltCard>
              <Card className="bg-card/70 border-border/40 hover:border-primary/50 transition-colors duration-500">
                <CardHeader>
                  <div className="flex items-center justify-between mb-1">
                    <CardTitle className="text-base font-normal">Secure Chat</CardTitle>
                    <span className="font-mono text-[9px] tracking-widest uppercase text-primary border border-primary/40 px-1.5 py-0.5 rounded-[2px]">
                      WIP
                    </span>
                  </div>
                  <CardDescription>E2E encrypted messaging using Signal protocol.</CardDescription>
                </CardHeader>
              </Card>
            </TiltCard>
          </div>
        </ScrollFade>

        {/* ── Column 2: Selected Work (厳選作品) ── */}
        <ScrollFade className="md:col-span-4" delay={220}>
          <div className="space-y-6">
            <div className="flex items-baseline justify-between border-b border-border/40 pb-2">
              <h2 className="font-display text-base font-normal tracking-wide text-foreground">
                selected work
              </h2>
              <span className="font-display text-xs text-primary opacity-80">
                厳選作品
              </span>
            </div>
            <div className="divide-y divide-border/25">
              {featuredProjects.map((project) => (
                <Link key={project.id} href={project.github} target="_blank" className="block group">
                  <div className="py-4 flex items-baseline justify-between gap-4 hover:px-1 transition-all">
                    <div className="min-w-0">
                      <h3 className="font-display font-normal text-base text-foreground/90 group-hover:text-primary transition-colors mb-0.5">
                        {project.name}
                      </h3>
                      <p className="font-sans text-xs text-muted-foreground font-light leading-relaxed opacity-75 line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                    <span className="text-primary opacity-40 group-hover:opacity-100 transition-opacity shrink-0 text-sm">
                      ↗
                    </span>
                  </div>
                </Link>
              ))}
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 font-sans text-xs tracking-wider uppercase text-primary opacity-80 hover:opacity-100 transition-opacity mt-6"
              >
                all projects 全作品 →
              </Link>
            </div>
          </div>
        </ScrollFade>

        {/* ── Column 3: Writing (執筆・考察) ── */}
        <ScrollFade className="md:col-span-4" delay={340}>
          <div className="space-y-6">
            <div className="flex items-baseline justify-between border-b border-border/40 pb-2">
              <h2 className="font-display text-base font-normal tracking-wide text-foreground">
                recent writing
              </h2>
              <span className="font-display text-xs text-primary opacity-80">
                執筆
              </span>
            </div>
            <div className="divide-y divide-border/25">
              {recentArticles.map((article) => (
                <Link key={article.id} href={`/writing/${article.slug}`} className="block group">
                  <div className="py-4 flex justify-between items-baseline gap-4 hover:px-1 transition-all">
                    <h3 className="font-display font-normal text-sm leading-snug text-foreground/90 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <span className="font-mono text-[10px] text-muted-foreground shrink-0 opacity-50">
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
                className="inline-flex items-center gap-2 font-sans text-xs tracking-wider uppercase text-primary opacity-80 hover:opacity-100 transition-opacity mt-6"
              >
                all writing 全執筆 →
              </Link>
            </div>
          </div>
        </ScrollFade>

      </div>

    </main>
  )
}
