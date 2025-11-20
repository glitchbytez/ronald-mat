import Link from "next/link"
import articlesData from "@/data/articles.json"
import projectsData from "@/data/projects.json"

export default function Component() {
  // Get featured article (latest 1)
  const featuredArticle = articlesData.articles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 1)

  // Get featured projects
  const featuredProjects = projectsData.projects.filter((project) => project.featured)

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-white selection:text-black flex flex-col">

      {/* Navigation / Header - Minimal like x.ai */}
      <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
        <div className="text-xl font-bold tracking-tighter">
          <span className="hidden sm:inline">RONALD MAT</span>
          <span className="sm:hidden">RM</span>
        </div>
        <nav className="flex gap-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
          <Link href="/writing" className="hover:text-foreground transition-colors">Writing</Link>
          <Link href="mailto:ronald@mat.dev" className="hover:text-foreground transition-colors">Contact</Link>
        </nav>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-24 max-w-4xl mx-auto w-full">

        {/* Hero Section */}
        <div className="mb-24 text-center space-y-6 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            SECURING DIGITAL <br /> FRONTIERS.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            Junior software developer exploring cybersecurity, networking, and ethical hacking.
          </p>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">

          {/* Projects Column */}
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Featured Projects</h2>
              <Link href="/projects" className="font-mono text-xs uppercase tracking-widest hover:text-muted-foreground transition-colors">→</Link>
            </div>
            <div className="space-y-6">
              {featuredProjects.map((project) => (
                <div key={project.id} className="group">
                  <Link href={project.github} target="_blank" rel="noopener noreferrer" className="block space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-medium group-hover:underline decoration-1 underline-offset-4">{project.name}</h3>
                      {project.external && <span className="text-xs text-muted-foreground font-mono">EXTERNAL</span>}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Writing Column */}
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Latest Writing</h2>
              <Link href="/writing" className="font-mono text-xs uppercase tracking-widest hover:text-muted-foreground transition-colors">→</Link>
            </div>
            <div className="space-y-6">
              {featuredArticle.map((article) => (
                <div key={article.id} className="group">
                  <Link href={`/writing/${article.slug}`} className="block space-y-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-medium group-hover:underline decoration-1 underline-offset-4">{article.title}</h3>
                      <span className="text-xs text-muted-foreground font-mono">{new Date(article.date).getFullYear()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {article.description}
                    </p>
                  </Link>
                </div>
              ))}

              {/* Static "Now" item as a writing piece equivalent */}
              <div className="group">
                <div className="block space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-medium text-muted-foreground">Currently Learning</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Working through TryHackMe rooms and studying for security certifications.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 flex justify-between items-center text-xs text-muted-foreground font-mono uppercase tracking-widest">
        <div>
          &copy; 2025 Ronald Mat
        </div>
        <div className="flex gap-4">
          <Link href="https://github.com" className="hover:text-foreground transition-colors">GitHub</Link>
          <Link href="https://twitter.com" className="hover:text-foreground transition-colors">Twitter</Link>
        </div>
      </footer>
    </div>
  )
}
