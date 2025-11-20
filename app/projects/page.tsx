
import Link from "next/link"
import projectsData from "@/data/projects.json"

export default function ProjectsPage() {
  // Group projects by category (featured vs others)
  const featuredProjects = projectsData.projects.filter((project) => project.featured)
  const otherProjects = projectsData.projects.filter((project) => !project.featured)

  return (
    <main className="flex flex-col px-6 max-w-4xl mx-auto w-full">

      <div className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">PROJECTS</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Security tools, web applications, and experiments in code.
        </p>
      </div>

      <div className="space-y-16">
        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="space-y-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Featured</h2>
            <div className="grid gap-8">
              {featuredProjects.map((project) => (
                <div key={project.id} className="group">
                  <Link href={project.github} target="_blank" rel="noopener noreferrer" className="block space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xl font-medium group-hover:underline decoration-1 underline-offset-4">{project.name}</h3>
                      <span className="text-xs text-muted-foreground font-mono">FEATURED</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-2xl">
                      {project.description}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Other Projects */}
        <section className="space-y-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Archive</h2>
          <div className="grid gap-6">
            {otherProjects.map((project) => (
              <div key={project.id} className="group">
                <Link href={project.github} target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8">
                  <h3 className="text-lg font-medium group-hover:underline decoration-1 underline-offset-4 shrink-0">{project.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1 sm:text-right">
                    {project.description}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

    </main>
  )
}
