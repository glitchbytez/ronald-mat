import Link from "next/link"
import projectsData from "@/data/projects.json"
import articlesData from "@/data/articles.json"

export default function Home() {
  const featuredProjects = projectsData.projects.filter((p) => p.featured)
  const recentArticles = articlesData.articles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <main className="flex flex-col px-6 max-w-4xl mx-auto w-full justify-center">

      {/* Hero Section */}
      <section className="mb-24 pt-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
          BUILDING <br />
          SECURE <br />
          SYSTEMS.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Junior software developer with a focus on cybersecurity, network analysis, and building resilient web applications.
        </p>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">

        {/* Column 1: Building (Now) */}
        <div className="md:col-span-4 space-y-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Building</h2>
          <div className="space-y-4">
            <div className="group">
              <h3 className="font-medium">Network Scanner</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Rust-based port scanner with service detection.
              </p>
            </div>
            <div className="group">
              <h3 className="font-medium">Secure Chat</h3>
              <p className="text-sm text-muted-foreground mt-1">
                E2E encrypted messaging app using Signal protocol.
              </p>
            </div>
          </div>
        </div>

        {/* Column 2: Projects */}
        <div className="md:col-span-4 space-y-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Selected Work</h2>
          <div className="space-y-4">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={project.github} target="_blank" className="block group">
                <h3 className="font-medium group-hover:underline decoration-1 underline-offset-4">{project.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {project.description}
                </p>
              </Link>
            ))}
            <Link href="/projects" className="inline-block text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground mt-2">
              View All Projects →
            </Link>
          </div>
        </div>

        {/* Column 3: Writing */}
        <div className="md:col-span-4 space-y-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-border pb-2">Recent Writing</h2>
          <div className="space-y-4">
            {recentArticles.map((article) => (
              <Link key={article.id} href={`/writing/${article.slug}`} className="block group">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium group-hover:underline decoration-1 underline-offset-4 truncate pr-4">{article.title}</h3>
                  <span className="text-xs text-muted-foreground font-mono shrink-0">
                    {new Date(article.date).getFullYear()}
                  </span>
                </div>
              </Link>
            ))}
            <Link href="/writing" className="inline-block text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground mt-2">
              Read All Articles →
            </Link>
          </div>
        </div>

      </div>

    </main>
  )
}
