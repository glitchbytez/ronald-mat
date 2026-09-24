import Link from "next/link"
import articlesData from "@/data/articles.json"
import { ScrollFade } from "@/components/scroll-fade"

export default function WritingPage() {
  const articlesByYear = articlesData.articles.reduce(
    (acc, article) => {
      const year = article.year
      if (!acc[year]) acc[year] = []
      acc[year].push(article)
      return acc
    },
    {} as Record<string, typeof articlesData.articles>,
  )

  const sortedYears = Object.keys(articlesByYear).sort(
    (a, b) => Number.parseInt(b) - Number.parseInt(a),
  )

  return (
    <main className="flex flex-col px-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <ScrollFade className="mb-20 pt-8">
        <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase mb-4 block opacity-60">
          Essays & Reflections
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-normal tracking-wide mb-6">
          Writing
        </h1>
        <p className="font-sans italic text-muted-foreground text-lg max-w-2xl font-light leading-relaxed">
          Thoughts on security, software architecture, and the craft of web interfaces.
        </p>
      </ScrollFade>

      <div className="space-y-20">
        {sortedYears.map((year) => (
          <section key={year}>
            <ScrollFade>
              <div className="flex justify-between items-baseline border-b border-border/30 pb-3 mb-6">
                <h2 className="font-display text-sm italic opacity-50">{year}</h2>
                <span className="font-mono text-[11px] text-muted-foreground opacity-30">
                  [{articlesByYear[year].length} entries]
                </span>
              </div>
            </ScrollFade>

            <div className="divide-y divide-border/20">
              {articlesByYear[year]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((article, idx) => (
                  <ScrollFade key={article.id} delay={idx * 60}>
                    <Link href={`/writing/${article.slug}`} className="group block">
                      <div className="py-6 flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 hover:px-2 transition-all duration-300">
                        <div className="space-y-1">
                          <h3 className="font-display font-normal text-xl opacity-85 group-hover:italic group-hover:opacity-100 transition-all duration-300 leading-snug">
                            {article.title}
                          </h3>
                          {article.summary && (
                            <p className="font-sans text-xs text-muted-foreground font-light line-clamp-1 opacity-70">
                              {article.summary}
                            </p>
                          )}
                        </div>
                        <span className="font-mono text-xs text-muted-foreground shrink-0 opacity-40 group-hover:opacity-70 transition-opacity">
                          {new Date(article.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </Link>
                  </ScrollFade>
                ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
