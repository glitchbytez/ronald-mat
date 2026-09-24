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

  const sortedYears = Object.keys(articlesByYear).sort(
    (a, b) => Number.parseInt(b) - Number.parseInt(a),
  )

  return (
    <main className="flex flex-col px-8 max-w-5xl mx-auto w-full animate-wabi-in">

      <div className="mb-20 pt-8">
        <h1 className="font-display text-5xl md:text-6xl font-normal tracking-wide mb-6">
          Writing
        </h1>
        <p className="font-sans italic text-muted-foreground text-lg max-w-2xl font-light leading-relaxed">
          Thoughts on security, software development, and learning.
        </p>
      </div>

      <div className="space-y-16 animate-wabi-in-slow">
        {sortedYears.map((year) => (
          <section key={year} className="space-y-0">
            <h2 className="font-display text-sm italic opacity-50 border-b border-border/25 pb-3 mb-2">
              {year}
            </h2>
            <div>
              {articlesByYear[year]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((article) => (
                  <Link key={article.id} href={`/writing/${article.slug}`} className="group block">
                    <div className="py-5 border-b border-border/20 flex justify-between items-baseline gap-8">
                      <h3 className="font-display font-normal text-lg opacity-80 group-hover:italic group-hover:opacity-100 transition-all duration-500 leading-snug">
                        {article.title}
                      </h3>
                      <span className="font-mono text-xs text-muted-foreground shrink-0 opacity-40">
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>

    </main>
  )
}
