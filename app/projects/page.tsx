import Link from "next/link"
import projectsData from "@/data/projects.json"
import { ScrollFade } from "@/components/scroll-fade"
import { TiltCard } from "@/components/tilt-card"
import { HankoStamp } from "@/components/hanko-stamp"

export default function ProjectsPage() {
  const featuredProjects = projectsData.projects.filter((project) => project.featured)
  const otherProjects = projectsData.projects.filter((project) => !project.featured)

  return (
    <main className="flex flex-col px-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <ScrollFade className="mb-16 pt-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="font-mono text-xs tracking-widest text-primary uppercase mb-2 block font-medium">
              作品集 • Selected Works
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-normal tracking-wide">
              Projects
            </h1>
          </div>
          <HankoStamp kanji="作品" subtext="Projects" size="md" />
        </div>
        <p className="font-sans italic text-muted-foreground text-lg max-w-2xl font-light leading-relaxed">
          Security tools, web applications, and experimental code crafted with quiet intentionality.
        </p>
      </ScrollFade>

      <div className="space-y-24">
        {/* Featured Projects Grid */}
        {featuredProjects.length > 0 && (
          <section>
            <ScrollFade>
              <div className="flex justify-between items-baseline border-b border-border/40 pb-3 mb-10">
                <div className="flex items-baseline gap-3">
                  <h2 className="font-display text-lg font-normal">featured works</h2>
                  <span className="font-display text-xs text-primary opacity-80">注目の作品</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground opacity-60">
                  [{featuredProjects.length} items]
                </span>
              </div>
            </ScrollFade>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project, idx) => (
                <ScrollFade key={project.id} delay={idx * 100}>
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <TiltCard className="p-8 h-full flex flex-col justify-between border border-border/40 hover:border-primary/60 transition-colors duration-500 rounded-sm bg-card/50">
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <span className="font-mono text-xs text-primary font-bold">
                            壱 / 0{idx + 1}
                          </span>
                          <span className="font-mono text-xs text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                            ↗
                          </span>
                        </div>
                        <h3 className="font-display font-normal text-2xl mb-3 text-foreground group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed mb-6">
                          {project.description}
                        </p>
                      </div>

                      {project.tags && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/20">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[10px] px-2 py-0.5 border border-primary/30 rounded-full text-primary/80 bg-primary/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </TiltCard>
                  </Link>
                </ScrollFade>
              ))}
            </div>
          </section>
        )}

        {/* Archive List */}
        <section>
          <ScrollFade>
            <div className="flex justify-between items-baseline border-b border-border/40 pb-3 mb-8">
              <div className="flex items-baseline gap-3">
                <h2 className="font-display text-lg font-normal">archive index</h2>
                <span className="font-display text-xs text-primary opacity-80">目録</span>
              </div>
              <span className="font-mono text-xs text-muted-foreground opacity-60">
                [{otherProjects.length} items]
              </span>
            </div>
          </ScrollFade>

          <div className="divide-y divide-border/25">
            {otherProjects.map((project, idx) => (
              <ScrollFade key={project.id} delay={idx * 50}>
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 py-6 hover:px-3 transition-all duration-300 border-b border-border/20"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-muted-foreground opacity-50 shrink-0">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <h3 className="font-display font-normal text-xl text-foreground/90 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-muted-foreground font-light opacity-75 max-w-md line-clamp-1 sm:text-right">
                    {project.description}
                  </p>
                </Link>
              </ScrollFade>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
