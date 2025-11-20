import Link from "next/link"
import toolsData from "@/data/tools.json"

export default function CraftPage() {
  return (
    <main className="flex flex-col px-6 max-w-4xl mx-auto w-full">

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
  )
}
