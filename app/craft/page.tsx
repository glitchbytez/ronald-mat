import Link from "next/link"
import toolsData from "@/data/tools.json"

export default function CraftPage() {
  return (
    <main className="flex flex-col px-8 max-w-5xl mx-auto w-full animate-wabi-in">

      <div className="mb-20 pt-8">
        <h1 className="font-display text-5xl md:text-6xl font-normal tracking-wide mb-6">
          Craft
        </h1>
        <p className="font-sans italic text-muted-foreground text-lg max-w-2xl font-light leading-relaxed">
          Custom penetration testing and network analysis utilities built for specific security research needs.
        </p>
      </div>

      <div className="space-y-20 animate-wabi-in-slow">
        {toolsData.categories.map((category) => (
          <section key={category.name} className="space-y-0">
            <h2 className="font-display text-sm italic opacity-60 border-b border-border/30 pb-3 mb-2">
              {category.name.toLowerCase()}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-border/20">
              {category.tools.map((tool, index) => (
                <Link
                  key={tool.name}
                  href={tool.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex justify-between items-start py-7 border-b border-border/20 ${
                    index % 2 === 0 ? "md:pr-10" : "md:pl-10"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-normal text-lg mb-2 opacity-85 group-hover:italic group-hover:opacity-100 transition-all duration-500">
                      {tool.name}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed opacity-80">
                      {tool.description}
                    </p>
                  </div>
                  <span className="text-muted-foreground opacity-20 group-hover:opacity-60 transition-opacity duration-500 ml-6 shrink-0 text-sm mt-0.5">
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

    </main>
  )
}
