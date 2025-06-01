import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 mb-10 py-5 -mx-6 px-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-xs"
            >
              ← Index
            </Link>
            <h1 className="text-base font-medium text-gray-900 dark:text-gray-100">Writing</h1>
            <div></div> {/* Spacer for center alignment */}
          </div>
        </header>

        {/* Writing List */}
        <div className="space-y-10">
          {sortedYears.map((year) => (
            <section key={year}>
              <div className="flex">
                <div className="w-14 flex-shrink-0">
                  <h2 className="text-gray-400 dark:text-gray-500 text-xs">{year}</h2>
                </div>
                <div className="flex-1 space-y-3">
                  {articlesByYear[year]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((article) => (
                      <div key={article.id} className="flex justify-between items-start">
                        <Link
                          href={`/writing/${article.slug}`}
                          className="text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors text-sm"
                        >
                          {article.title}
                        </Link>
                        <span className="text-gray-400 dark:text-gray-500 text-xs ml-4">
                          {new Date(article.date).toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
