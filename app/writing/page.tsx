import Link from "next/link"
import articlesData from "@/data/articles.json"

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
    <main className="flex flex-col px-6 max-w-4xl mx-auto w-full">

      <div className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">WRITING</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Thoughts on security, software development, and learning.
        </p>
      </div>

      <div className="space-y-16">
        {sortedYears.map((year) => (
          <section key={year} className="space-y-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground border-b border-border pb-2">{year}</h2>
            <div className="grid gap-6">
              {articlesByYear[year]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((article) => (
                  <div key={article.id} className="group">
                    <Link href={`/writing/${article.slug}`} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8">
                      <h3 className="text-lg font-medium group-hover:underline decoration-1 underline-offset-4 shrink-0">{article.title}</h3>
                      <span className="text-xs text-muted-foreground font-mono">
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
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
