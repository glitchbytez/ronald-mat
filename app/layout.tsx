import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { IM_Fell_English, Shippori_Mincho, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const imFellEnglish = IM_Fell_English({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const shipporiMincho = Shippori_Mincho({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

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
                
                window.addEventListener('storage', function(e) {
                  if (e.key === 'theme') setTheme();
                });
                
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setTheme);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${imFellEnglish.variable} ${shipporiMincho.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="theme"
        >
          {/* Global Sticky Header — quiet, recedes */}
          <header className="fixed top-0 left-0 right-0 h-14 px-8 flex justify-between items-center z-50 bg-background/95 border-b border-border/30">
            <div>
              <Link
                href="/"
                className="font-display font-normal text-xs tracking-[0.22em] uppercase opacity-80 hover:opacity-100 transition-opacity duration-500"
              >
                <span className="hidden sm:inline">Ronald Mat</span>
                <span className="sm:hidden">RM</span>
              </Link>
            </div>
            <nav className="flex gap-10 text-xs text-muted-foreground">
              <Link
                href="/projects"
                className="tracking-[0.12em] uppercase opacity-50 hover:opacity-90 transition-opacity duration-500"
              >
                Projects
              </Link>
              <Link
                href="/writing"
                className="tracking-[0.12em] uppercase opacity-50 hover:opacity-90 transition-opacity duration-500"
              >
                Writing
              </Link>
              <Link
                href="mailto:ronald@mat.dev"
                className="tracking-[0.12em] uppercase opacity-50 hover:opacity-90 transition-opacity duration-500"
              >
                Contact
              </Link>
            </nav>
          </header>

          {/* Main Content */}
          <div className="flex-1 flex flex-col pt-24 pb-24 animate-wabi-in">
            {children}
          </div>

          {/* Global Sticky Footer — barely there */}
          <footer className="fixed bottom-0 left-0 right-0 py-4 px-8 flex justify-between items-center text-xs text-muted-foreground font-mono bg-background/95 border-t border-border/20 z-50 opacity-50 hover:opacity-80 transition-opacity duration-500">
            <div>&copy; 2025 Ronald Mat</div>
            <div className="flex gap-6">
              <Link href="https://github.com" className="tracking-wider uppercase hover:text-foreground transition-colors duration-500">
                GitHub
              </Link>
              <Link href="https://twitter.com" className="tracking-wider uppercase hover:text-foreground transition-colors duration-500">
                Twitter
              </Link>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
