import Link from "next/link"
import { notFound } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import articlesData from "@/data/articles.json"
import type { JSX } from "react"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articlesData.articles.find((a) => a.slug === params.slug)

  if (!article) {
    notFound()
  }

  // Simple markdown-like content rendering
  const renderContent = (content: string) => {
    const lines = content.split("\n")
    const elements: JSX.Element[] = []
    let currentIndex = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={currentIndex++} className="text-base font-medium text-gray-900 dark:text-gray-100 mt-7 mb-3">
            {line.replace("## ", "")}
          </h2>,
        )
      } else if (line.startsWith("```")) {
        // Find the closing \`\`\`
        let codeContent = ""
        let j = i + 1
        while (j < lines.length && !lines[j].startsWith("```")) {
          codeContent += lines[j] + "\n"
          j++
        }
        elements.push(
          <div key={currentIndex++} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 my-5">
            <pre className="text-xs text-gray-800 dark:text-gray-200 overflow-x-auto">
              <code>{codeContent.trim()}</code>
            </pre>
          </div>,
        )
        i = j // Skip to after the closing \`\`\`
      } else if (line.startsWith("- ")) {
        // Handle list items
        const listItems = []
        let k = i
        while (k < lines.length && lines[k].startsWith("- ")) {
          listItems.push(lines[k].replace("- ", ""))
          k++
        }
        elements.push(
          <ul key={currentIndex++} className="list-disc list-inside space-y-2 ml-4">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-sm text-gray-700 dark:text-gray-300">
                {item}
              </li>
            ))}
          </ul>,
        )
        i = k - 1 // Adjust index
      } else if (line.trim() !== "") {
        // Regular paragraph
        const processedLine = line.replace(
          /`([^`]+)`/g,
          '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">$1</code>',
        )

        elements.push(
          <p
            key={currentIndex++}
            className="text-sm text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />,
        )
      }
    }

    return elements
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 mb-10 py-5 -mx-6 px-6">
          <Link
            href="/writing"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-xs"
          >
            ← Writing
          </Link>
        </header>

        {/* Article */}
        <article>
          {/* Title and Meta */}
          <div className="mb-10">
            <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">{article.title}</h1>
            <time className="text-gray-500 dark:text-gray-400 text-xs">
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="space-y-5 leading-relaxed">{renderContent(article.content)}</div>
          </div>
        </article>
      </div>
    </div>
  )
}
