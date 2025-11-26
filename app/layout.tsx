import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Ronald Mat",
  description: "Junior software developer passionate about cybersecurity and networking",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function setTheme() {
                  try {
                    var theme = localStorage.getItem('theme');
                    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    var isDark = theme === 'dark' || (theme === 'system' && systemDark) || (!theme && systemDark);
                    
                    if (isDark) {
                      document.documentElement.classList.add('dark');
                      document.documentElement.style.colorScheme = 'dark';
                    } else {
                      document.documentElement.classList.remove('dark');
                      document.documentElement.style.colorScheme = 'light';
                    }
                  } catch (e) {}
                }
                
                setTheme();
                
                // Listen for storage changes (when theme is changed in another tab)
                window.addEventListener('storage', function(e) {
                  if (e.key === 'theme') {
                    setTheme();
                  }
                });
                
                // Listen for system theme changes
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setTheme);
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col selection:bg-primary/10 selection:text-primary`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="theme"
        >
          {/* Global Sticky Header */}
          <header className="fixed top-0 left-0 right-0 h-16 px-6 flex justify-between items-center z-50 bg-background/60 backdrop-blur-md border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
            <div className="text-lg font-bold tracking-tight">
              <Link href="/" className="hover:text-primary/80 transition-colors flex items-center gap-2">
                <span className="hidden sm:inline">RONALD MAT</span>
                <span className="sm:hidden">RM</span>
              </Link>
            </div>
            <nav className="flex gap-8 text-sm font-medium text-muted-foreground">
              <Link href="/projects" className="hover:text-foreground transition-colors relative group">
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/writing" className="hover:text-foreground transition-colors relative group">
                Writing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
              <Link href="mailto:ronald@mat.dev" className="hover:text-foreground transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            </nav>
          </header>

          {/* Main Content Wrapper */}
          <div className="flex-1 flex flex-col pt-24 pb-24 animate-fade-in">
            {children}
          </div>

          {/* Global Sticky Footer */}
          <footer className="fixed bottom-0 left-0 right-0 py-4 px-6 flex justify-between items-center text-xs text-muted-foreground font-mono bg-background/60 backdrop-blur-md border-t border-border/40 z-50">
            <div>
              &copy; 2025 Ronald Mat
            </div>
            <div className="flex gap-6">
              <Link href="https://github.com" className="hover:text-foreground transition-colors">GitHub</Link>
              <Link href="https://twitter.com" className="hover:text-foreground transition-colors">Twitter</Link>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
