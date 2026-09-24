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
          <h2
            key={currentIndex++}
            className="font-display text-2xl font-normal italic tracking-wide mt-14 mb-5 opacity-90"
          >
            {line.replace("## ", "")}
          </h2>,
        )
      } else if (line.startsWith("```")) {
        let codeContent = ""
        let j = i + 1
        while (j < lines.length && !lines[j].startsWith("```")) {
          codeContent += lines[j] + "\n"
          j++
        }
        elements.push(
          <div
            key={currentIndex++}
            className="border-l-2 border-border/50 bg-muted/30 pl-4 pr-4 py-3 my-8 rounded-none"
          >
            <pre className="text-xs font-mono overflow-x-auto text-muted-foreground leading-relaxed">
              <code>{codeContent.trim()}</code>
            </pre>
          </div>,
        )
        i = j
      } else if (line.startsWith("- ")) {
        const listItems = []
        let k = i
        while (k < lines.length && lines[k].startsWith("- ")) {
          listItems.push(lines[k].replace("- ", ""))
          k++
        }
        elements.push(
          <ul key={currentIndex++} className="space-y-2 ml-6 my-6 text-muted-foreground font-light">
            {listItems.map((item, idx) => (
              <li key={idx} className="relative before:content-['·'] before:absolute before:-left-4 before:opacity-50">
                {item}
              </li>
            ))}
          </ul>,
        )
        i = k - 1
      } else if (line.trim() !== "") {
        const processedLine = line.replace(
          /`([^`]+)`/g,
          '<code class="border-b border-border/50 bg-transparent font-mono text-xs text-foreground/80 px-0.5">$1</code>',
        )

        elements.push(
          <p
            key={currentIndex++}
            className="font-sans text-muted-foreground leading-[1.85] mb-5 font-light"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />,
        )
      }
    }

    return elements
  }

  return (
    <main className="flex flex-col px-8 max-w-2xl mx-auto w-full animate-wabi-in">

      <article>
        {/* Date + Title */}
        <div className="mb-16 pt-8">
          <div className="font-sans text-xs italic opacity-40 uppercase tracking-widest mb-6">
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-normal tracking-wide leading-tight mb-10">
            {article.title}
          </h1>
          <hr className="border-t border-border/30 w-16" />
        </div>

        {/* Content */}
        <div className="max-w-none">
          {renderContent(article.content)}
        </div>
      </article>

      {/* Back link */}
      <div className="mt-24 pt-10 border-t border-border/20 pb-12">
        <Link
          href="/writing"
          className="font-sans text-xs italic opacity-40 hover:opacity-80 transition-opacity duration-500 tracking-wide"
        >
          ← back to writing
        </Link>
      </div>

    </main>
  )
}
