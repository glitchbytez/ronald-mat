import Link from "next/link"
import { Clock } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import articlesData from "@/data/articles.json"
import projectsData from "@/data/projects.json"

export default function Component() {
  // Get featured article (latest 1)
  const featuredArticle = articlesData.articles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 1)

  // Get featured projects
  const featuredProjects = projectsData.projects.filter((project) => project.featured)

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* First Section - Main Portfolio */}
      <section className="min-h-screen">
        <div className="max-w-2xl mx-auto px-6 py-24 min-h-screen flex flex-col">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-5">Ronald Mat</h1>

            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              <p>
                <em>Learning to secure digital frontiers.</em> Junior software developer with a growing passion for
                cybersecurity and networking. Building projects to understand security fundamentals while exploring the
                fascinating world of ethical hacking.
              </p>

              <p>
                Currently studying web security, learning penetration testing basics, and building simple security tools
                to deepen my understanding.
              </p>
            </div>
          </header>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-3 gap-10 flex-1">
            {/* Building Column */}
            <div>
              <h2 className="text-gray-700 dark:text-gray-300 font-medium mb-5 text-sm">Building</h2>
              <div className="space-y-4">
                <div>
                  <Link
                    href="/craft"
                    className="text-gray-900 dark:text-gray-100 font-medium hover:text-gray-600 dark:hover:text-gray-400 transition-colors text-sm"
                  >
                    Security Tools
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mt-1">
                    Learning-focused security tools and educational scripts.
                  </p>
                </div>
              </div>
            </div>

            {/* Projects Column */}
            <div>
              <h2 className="text-gray-700 dark:text-gray-300 font-medium mb-5 text-sm">Projects</h2>
              <div className="space-y-5">
                {featuredProjects.map((project) => (
                  <div key={project.id}>
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 dark:text-gray-100 font-medium hover:text-gray-600 dark:hover:text-gray-400 transition-colors text-sm"
                    >
                      {project.name} {project.external && "→"}
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mt-1">
                      {project.description}
                    </p>
                  </div>
                ))}

                <div>
                  <Link
                    href="/projects"
                    className="text-gray-900 dark:text-gray-100 font-medium hover:text-gray-600 dark:hover:text-gray-400 transition-colors text-sm"
                  >
                    All projects
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mt-1">
                    Security tools, web applications, and learning projects.
                  </p>
                </div>
              </div>
            </div>

            {/* Writing Column */}
            <div>
              <h2 className="text-gray-700 dark:text-gray-300 font-medium mb-5 text-sm">Writing</h2>
              <div className="space-y-5">
                {featuredArticle.map((article) => (
                  <div key={article.id}>
                    <Link
                      href={`/writing/${article.slug}`}
                      className="text-gray-900 dark:text-gray-100 font-medium hover:text-gray-600 dark:hover:text-gray-400 transition-colors text-sm"
                    >
                      {article.title}
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mt-1">
                      {article.description}
                    </p>
                  </div>
                ))}

                <div>
                  <Link
                    href="/writing"
                    className="text-gray-900 dark:text-gray-100 font-medium hover:text-gray-600 dark:hover:text-gray-400 transition-colors text-sm"
                  >
                    All writing
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mt-1">
                    Learning notes on security, networking, and development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section - Now, Connect, Footer */}
      <section className="min-h-screen">
        <div className="max-w-2xl mx-auto px-6 py-16 min-h-screen flex flex-col">
          {/* Now Section */}
          <div className="mb-14">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-5">Now</h2>

            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              <p>
                Learning cybersecurity fundamentals through hands-on practice and online courses. Currently working
                through TryHackMe rooms and studying for my first security certification. Passionate about{" "}
                <em>understanding how systems work and how to protect them</em>.
              </p>

              <p>
                Building simple security tools to understand concepts like network scanning, web vulnerabilities, and
                basic cryptography. Each project teaches me something new about the security landscape.
              </p>

              <p>
                When not coding, I enjoy reading security blogs, watching conference talks, and participating in
                beginner-friendly CTF challenges. Always excited to learn from the cybersecurity community.
              </p>
            </div>
          </div>

          {/* Connect Section */}
          <div className="mb-14">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-5">Connect</h2>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              <p>
                Reach me at{" "}
                <Link
                  href="#"
                  className="text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                >
                  @ronaldmat
                </Link>{" "}
                or{" "}
                <Link
                  href="mailto:ronald@mat.dev"
                  className="text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                >
                  ronald@mat.dev
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-gray-200 dark:border-gray-700 pt-5 mt-auto">
            <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <p>Learn, build, secure.</p>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-orange-600 dark:text-orange-400 font-medium">In Development</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>2025</span>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  )
}
