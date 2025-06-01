import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import toolsData from "@/data/tools.json"

export default function CraftPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 mb-10 py-5 -mx-6 px-6">
          <div className="flex items-center justify-between mb-5">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-xs"
            >
              ← Index
            </Link>
            <div className="text-center">
              <h1 className="text-base font-medium text-gray-900 dark:text-gray-100">Security Tools</h1>
              <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                Custom penetration testing and network analysis utilities.
              </p>
            </div>
            <div></div> {/* Spacer for center alignment */}
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-14">
          {toolsData.categories.map((category) => (
            <div key={category.name}>
              <h2 className="text-gray-700 dark:text-gray-300 font-medium mb-5 text-sm">{category.name}</h2>
              <div className="space-y-6">
                {category.tools.map((tool) => (
                  <div key={tool.name}>
                    <Link
                      href={tool.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 dark:text-gray-100 font-medium hover:text-gray-600 dark:hover:text-gray-400 transition-colors text-sm"
                    >
                      {tool.name} →
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mt-1">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
          <p>Stay secure.</p>
          <div className="flex items-center gap-1">
            <span>2025</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
