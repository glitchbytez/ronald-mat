import Link from "next/link"
import toolsData from "@/data/tools.json"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"

export default function CraftPage() {
  return (
    <main className="flex flex-col px-6 max-w-5xl mx-auto w-full">

      <div className="mb-20 pt-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">CRAFT</h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-light leading-relaxed">
          Custom penetration testing and network analysis utilities built for specific security research needs.
        </p>
      </div>

      <div className="space-y-20 animate-fade-in-delayed">
        {toolsData.categories.map((category) => (
          <section key={category.name} className="space-y-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-4">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.tools.map((tool) => (
                <Link key={tool.name} href={tool.github} target="_blank" rel="noopener noreferrer" className="group block h-full">
                  <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors opacity-50 group-hover:opacity-100" />
                      </div>
                      <CardDescription className="leading-relaxed">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

    </main>
  )
}
