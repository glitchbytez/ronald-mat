import Link from "next/link"
import articlesData from "@/data/articles.json"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export default function WritingPage() {
  // Group articles by year
  const articlesByYear = articlesData.articles.reduce(
    (acc, article) => {
      const year = article.year
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(article)
      return acc
    },
    {} as Record<string, typeof articlesData.articles>,
  )

  // Sort years in descending order
  const sortedYears = Object.keys(articlesByYear).sort((a, b) => Number.parseInt(b) - Number.parseInt(a))

  return (
    <main className="flex flex-col px-6 max-w-5xl mx-auto w-full">

      <div className="mb-20 pt-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">WRITING</h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-light leading-relaxed">
          Thoughts on security, software development, and learning.
        </p>
      </div>

      <div className="space-y-20 animate-fade-in-delayed">
        {sortedYears.map((year) => (
          <section key={year} className="space-y-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-4">{year}</h2>
            <div className="grid gap-4">
              {articlesByYear[year]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((article) => (
                  <Link key={article.id} href={`/writing/${article.slug}`} className="group block">
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:border-primary/20 transition-all duration-300">
                      <CardHeader className="flex flex-row items-center justify-between p-6">
                        <div className="space-y-1">
                          <CardTitle className="text-lg font-medium group-hover:text-primary transition-colors">{article.title}</CardTitle>
                          <p className="text-sm text-muted-foreground font-mono">
                            {new Date(article.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
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
