import Link from "next/link"
import projectsData from "@/data/projects.json"
import { ScrollFade } from "@/components/scroll-fade"
import { TiltCard } from "@/components/tilt-card"

export default function ProjectsPage() {
  const featuredProjects = projectsData.projects.filter((project) => project.featured)
  const otherProjects = projectsData.projects.filter((project) => !project.featured)

  return (
    <main className="flex flex-col px-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <ScrollFade className="mb-20 pt-8">
        <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase mb-4 block opacity-60">
          Selected Works & Index
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-normal tracking-wide mb-6">
          Projects
        </h1>
        <p className="font-sans italic text-muted-foreground text-lg max-w-2xl font-light leading-relaxed">
          Security tools, web applications, and experimental code crafted with quiet intentionality.
        </p>
      </ScrollFade>

      <div className="space-y-24">
        {/* Featured Projects Grid */}
        {featuredProjects.length > 0 && (
          <section>
            <ScrollFade>
              <div className="flex justify-between items-baseline border-b border-border/30 pb-3 mb-10">
                <h2 className="font-display text-sm italic opacity-60">featured works</h2>
                <span className="font-mono text-[11px] text-muted-foreground opacity-40">
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
                    <TiltCard className="p-8 h-full flex flex-col justify-between border border-border/30 hover:border-border/60 transition-colors duration-500 rounded-sm">
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <span className="font-mono text-xs text-muted-foreground opacity-40">
                            0{idx + 1}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground opacity-40 group-hover:opacity-100 transition-opacity">
                            ↗
                          </span>
                        </div>
                        <h3 className="font-display font-normal text-2xl mb-3 opacity-90 group-hover:italic group-hover:opacity-100 transition-all duration-300">
                          {project.name}
                        </h3>
                        <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed mb-6">
                          {project.description}
                        </p>
                      </div>

                      {project.tags && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/15">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[10px] px-2 py-0.5 border border-border/25 rounded-full text-muted-foreground/70"
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
            <div className="flex justify-between items-baseline border-b border-border/30 pb-3 mb-8">
              <h2 className="font-display text-sm italic opacity-60">archive index</h2>
              <span className="font-mono text-[11px] text-muted-foreground opacity-40">
                [{otherProjects.length} items]
              </span>
            </div>
          </ScrollFade>

          <div className="divide-y divide-border/20">
            {otherProjects.map((project, idx) => (
              <ScrollFade key={project.id} delay={idx * 50}>
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 py-6 hover:px-3 transition-all duration-300 border-b border-border/20"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-muted-foreground opacity-30 shrink-0">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <h3 className="font-display font-normal text-xl opacity-80 group-hover:italic group-hover:opacity-100 transition-all duration-300">
                      {project.name}
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-muted-foreground font-light opacity-70 max-w-md line-clamp-1 sm:text-right">
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
