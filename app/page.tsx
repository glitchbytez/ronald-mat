import Link from "next/link"
import projectsData from "@/data/projects.json"
import articlesData from "@/data/articles.json"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function Home() {
  const featuredProjects = projectsData.projects.filter((p) => p.featured)
  const recentArticles = articlesData.articles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <main className="flex flex-col px-8 max-w-5xl mx-auto w-full justify-center">

      {/* Hero Section */}
      <section className="mb-20 pt-16 animate-wabi-in">
        <h1 className="font-display text-6xl md:text-8xl font-normal tracking-wide leading-[1.05] mb-8">
          Building <br />
          <em>secure</em> <br />
          systems.
        </h1>
        <hr className="border-t border-border/40 mt-12 mb-8 w-24" />
        <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed font-light">
          Junior software developer with a focus on cybersecurity, network analysis,
          and building resilient web applications.
        </p>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 animate-wabi-in-slow">

        {/* Column 1: Building Now */}
        <div className="md:col-span-4 space-y-8">
          <h2 className="font-display text-sm italic opacity-60 border-b border-border/40 pb-3">
            building now
          </h2>
          <div className="space-y-5">
            <Card className="bg-card/70 border-border/40">
              <CardHeader>
                <CardTitle className="text-base">Network Scanner</CardTitle>
                <CardDescription>Rust-based port scanner with service detection.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/70 border-border/40">
              <CardHeader>
                <CardTitle className="text-base">Secure Chat</CardTitle>
                <CardDescription>E2E encrypted messaging app using Signal protocol.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Column 2: Selected Work */}
        <div className="md:col-span-4 space-y-8">
          <h2 className="font-display text-sm italic opacity-60 border-b border-border/40 pb-3">
            selected work
          </h2>
          <div className="space-y-0">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={project.github} target="_blank" className="block group">
                <div className="py-4 border-b border-border/25">
                  <h3 className="font-display font-normal text-base mb-1 opacity-80 group-hover:opacity-100 group-hover:italic transition-all duration-500">
                    {project.name}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground font-light leading-relaxed opacity-70">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-sans text-muted-foreground opacity-40 hover:opacity-80 transition-opacity duration-500 mt-5"
            >
              all projects →
            </Link>
          </div>
        </div>

        {/* Column 3: Recent Writing */}
        <div className="md:col-span-4 space-y-8">
          <h2 className="font-display text-sm italic opacity-60 border-b border-border/40 pb-3">
            recent writing
          </h2>
          <div className="space-y-0">
            {recentArticles.map((article) => (
              <Link key={article.id} href={`/writing/${article.slug}`} className="block group">
                <div className="py-4 border-b border-border/25 flex justify-between items-baseline gap-4">
                  <h3 className="font-display font-normal text-sm opacity-80 group-hover:opacity-100 group-hover:italic transition-all duration-500 leading-snug">
                    {article.title}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground shrink-0 opacity-40">
                    {new Date(article.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </span>
                </div>
              </Link>
            ))}
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 text-xs font-sans text-muted-foreground opacity-40 hover:opacity-80 transition-opacity duration-500 mt-5"
            >
              all writing →
            </Link>
          </div>
        </div>

      </div>

    </main>
  )
}
