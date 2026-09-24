import Link from "next/link"
import projectsData from "@/data/projects.json"

export default function ProjectsPage() {
  const featuredProjects = projectsData.projects.filter((project) => project.featured)
  const otherProjects = projectsData.projects.filter((project) => !project.featured)

  return (
    <main className="flex flex-col px-8 max-w-4xl mx-auto w-full animate-wabi-in">

      <div className="mb-20">
        <h1 className="font-display text-5xl md:text-6xl font-normal tracking-wide mb-6">
          Projects
        </h1>
        <p className="font-sans italic text-muted-foreground text-lg max-w-2xl font-light leading-relaxed">
          Security tools, web applications, and experiments in code.
        </p>
      </div>

      <div className="space-y-20 animate-wabi-in-slow">

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="space-y-0">
            <h2 className="font-display text-sm italic opacity-60 border-b border-border/30 pb-3 mb-8">
              featured
            </h2>
            <div>
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-8 border-b border-border/25"
                >
                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="font-display font-normal text-2xl opacity-85 group-hover:italic group-hover:opacity-100 transition-all duration-500">
                      {project.name}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground opacity-30 ml-6 shrink-0">↗</span>
                  </div>
                  <p className="font-sans text-muted-foreground leading-relaxed max-w-2xl font-light text-sm">
                    {project.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Archive */}
        <section className="space-y-0">
          <h2 className="font-display text-sm italic opacity-60 border-b border-border/30 pb-3 mb-8">
            archive
          </h2>
          <div>
            {otherProjects.map((project) => (
              <Link
                key={project.id}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-8 py-5 border-b border-border/20"
              >
                <h3 className="font-display font-normal text-lg shrink-0 opacity-80 group-hover:italic group-hover:opacity-100 transition-all duration-500">
                  {project.name}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed text-right font-light opacity-70 line-clamp-1">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

      </div>

    </main>
  )
}
