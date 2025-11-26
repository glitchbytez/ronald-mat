import Link from "next/link"
import projectsData from "@/data/projects.json"
import articlesData from "@/data/articles.json"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const featuredProjects = projectsData.projects.filter((p) => p.featured)
  const recentArticles = articlesData.articles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <main className="flex flex-col px-6 max-w-5xl mx-auto w-full justify-center">

      {/* Hero Section */}
      <section className="mb-32 pt-20 animate-fade-in">
        <div className="relative">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">
            BUILDING <br />
            <span className="text-muted-foreground">SECURE</span> <br />
            SYSTEMS.
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light">
          Junior software developer with a focus on cybersecurity, network analysis, and building resilient web applications.
        </p>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 animate-fade-in-delayed">

        {/* Column 1: Building (Now) */}
        <div className="md:col-span-4 space-y-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-4 mb-6">Building</h2>
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Network Scanner</CardTitle>
                <CardDescription>Rust-based port scanner with service detection.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Secure Chat</CardTitle>
                <CardDescription>E2E encrypted messaging app using Signal protocol.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Column 2: Projects */}
        <div className="md:col-span-4 space-y-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-4 mb-6">Selected Work</h2>
          <div className="space-y-4">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={project.github} target="_blank" className="block group">
                <Card className="h-full bg-transparent border-transparent hover:bg-card/50 hover:border-border/50 transition-all duration-300">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base group-hover:text-primary transition-colors flex items-center gap-2">
                      {project.name}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
            <Link href="/projects" className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mt-4 px-4">
              View All Projects <ArrowRight className="w-3 h-3 ml-2" />
            </Link>
          </div>
        </div>

        {/* Column 3: Writing */}
        <div className="md:col-span-4 space-y-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-4 mb-6">Recent Writing</h2>
          <div className="space-y-2">
            {recentArticles.map((article) => (
              <Link key={article.id} href={`/writing/${article.slug}`} className="block group">
                <div className="p-4 rounded-lg hover:bg-card/50 transition-colors">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors truncate pr-4">{article.title}</h3>
                    <span className="text-xs text-muted-foreground font-mono shrink-0 opacity-50">
                      {new Date(article.date).getFullYear()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/writing" className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mt-4 px-4">
              Read All Articles <ArrowRight className="w-3 h-3 ml-2" />
            </Link>
          </div>
        </div>

      </div>

    </main>
  )
}
