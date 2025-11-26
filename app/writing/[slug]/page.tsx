import Link from "next/link"
import { notFound } from "next/navigation"
import articlesData from "@/data/articles.json"
import type { JSX } from "react"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  // Ensure params are properly awaited in async component
  const { slug } = await Promise.resolve(params);

  const article = articlesData.articles.find((a) => a.slug === slug)

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
          <h2 key={currentIndex++} className="text-xl font-bold tracking-tight mt-10 mb-4">
            {line.replace("## ", "")}
          </h2>,
        )
      } else if (line.startsWith("```")) {
        // Find the closing ```
        let codeContent = ""
        let j = i + 1
        while (j < lines.length && !lines[j].startsWith("```")) {
          codeContent += lines[j] + "\n"
          j++
        }
        elements.push(
          <div key={currentIndex++} className="bg-muted/50 rounded-lg p-4 my-6 border border-border">
            <pre className="text-xs font-mono overflow-x-auto">
              <code>{codeContent.trim()}</code>
            </pre>
          </div>,
        )
        i = j // Skip to after the closing ```
      } else if (line.startsWith("- ")) {
        // Handle list items
        const listItems = []
        let k = i
        while (k < lines.length && lines[k].startsWith("- ")) {
          listItems.push(lines[k].replace("- ", ""))
          k++
        }
        elements.push(
          <ul key={currentIndex++} className="list-disc list-inside space-y-2 ml-4 my-4 text-muted-foreground">
            {listItems.map((item, idx) => (
              <li key={idx}>
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
          '<code class="bg-muted px-1 py-0.5 rounded text-xs font-mono">$1</code>',
        )

        elements.push(
          <p
            key={currentIndex++}
            className="text-muted-foreground leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />,
        )
      }
    }

    return elements
  }

  return (
    <main className="flex flex-col px-6 max-w-3xl mx-auto w-full animate-fade-in">

      <article>
        {/* Title and Meta */}
        <div className="mb-16 text-center pt-12">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight mb-8">{article.title}</h1>
          <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-muted-foreground prose-p:leading-relaxed prose-code:text-primary prose-pre:bg-card/50 prose-pre:border prose-pre:border-border/50">
          {renderContent(article.content)}
        </div>
      </article>

      <div className="mt-24 pt-12 border-t border-border/50 flex justify-center pb-12">
        <Link href="/writing" className="group flex items-center font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
          <span className="group-hover:-translate-x-1 transition-transform mr-2">←</span> Back to Writing
        </Link>
      </div>

    </main>
  )
}
