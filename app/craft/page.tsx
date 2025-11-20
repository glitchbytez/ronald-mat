import Link from "next/link"
import toolsData from "@/data/tools.json"

export default function CraftPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-white selection:text-black flex flex-col">

      {/* Navigation / Header */}
      <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
        <div className="text-xl font-bold tracking-tighter">
          <Link href="/" className="hover:text-muted-foreground transition-colors">
            <span className="hidden sm:inline">RONALD MAT</span>
            <span className="sm:hidden">RM</span>
          </Link>
        </div>
        <nav className="flex gap-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
          <Link href="/writing" className="hover:text-foreground transition-colors">Writing</Link>
          <Link href="mailto:ronald@mat.dev" className="hover:text-foreground transition-colors">Contact</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-6 py-24 max-w-4xl mx-auto w-full">

        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">CRAFT</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Custom penetration testing and network analysis utilities.
          </p>
        </div>

        <div className="space-y-16">
          {toolsData.categories.map((category) => (
            <section key={category.name} className="space-y-8">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-border pb-2">{category.name}</h2>
              <div className="grid gap-6">
                {category.tools.map((tool) => (
                  <div key={tool.name} className="group">
                    <Link href={tool.github} target="_blank" rel="noopener noreferrer" className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8">
                      <h3 className="text-lg font-medium group-hover:underline decoration-1 underline-offset-4 shrink-0">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1 sm:text-right">
                        {tool.description}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          ))}
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
