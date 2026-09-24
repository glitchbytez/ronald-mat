import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { IM_Fell_English, Shippori_Mincho, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { InkCursor }  from "@/components/ink-cursor"
import { LiveClock }  from "@/components/live-clock"
import { HankoStamp } from "@/components/hanko-stamp"
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
  title: "Ronald Mat — ロナルド マット",
  description: "Junior software developer & UI engineer passionate about cybersecurity, wabi-sabi design systems, and network security",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
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
                window.addEventListener('storage', function(e) { if (e.key === 'theme') setTheme(); });
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
          <InkCursor />

          {/* ── Authentic Wabi-Sabi Header ── */}
          <header className="fixed top-0 left-0 right-0 h-16 px-8 flex items-center justify-between z-50 bg-background/90 backdrop-blur-md border-b border-border/40">
            {/* Brand Logo with Hanko Seal & Kanji */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <HankoStamp kanji="侘" subtext="印" size="sm" />
              <div className="flex flex-col">
                <span className="font-display text-sm tracking-[0.2em] uppercase font-semibold text-foreground group-hover:text-primary transition-colors">
                  Ronald Mat
                </span>
                <span className="font-mono text-[10px] text-muted-foreground opacity-60">
                  ロナルド マット
                </span>
              </div>
            </Link>

            {/* Live Local Clock */}
            <div className="hidden md:flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase text-muted-foreground opacity-50 tracking-wider">
                TOKYO / LOCAL:
              </span>
              <LiveClock />
            </div>

            {/* Navigation with Japanese Calligraphy Subtitles */}
            <nav className="flex gap-8">
              {[
                { label: "Projects", kanji: "作品", href: "/projects" },
                { label: "Writing",  kanji: "文章", href: "/writing" },
                { label: "Craft",    kanji: "工芸", href: "/craft" },
                { label: "Contact",  kanji: "連絡", href: "mailto:ronald@mat.dev" },
              ].map(({ label, kanji, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex flex-col items-end group"
                >
                  <span className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground group-hover:text-primary transition-colors">
                    {label}
                  </span>
                  <span className="font-display text-[10px] text-muted-foreground opacity-40 group-hover:opacity-90 transition-opacity">
                    {kanji}
                  </span>
                </Link>
              ))}
            </nav>
          </header>

          {/* Main content */}
          <div className="flex-1 flex flex-col pt-28 pb-24 animate-wabi-in">
            {children}
          </div>

          {/* ── Authentic Wabi-Sabi Footer ── */}
          <footer className="fixed bottom-0 left-0 right-0 py-4 px-8 flex justify-between items-center z-50 bg-background/90 backdrop-blur-md border-t border-border/30">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-muted-foreground opacity-50 tracking-widest">
                &copy; 2025 Ronald Mat • 侘寂
              </span>
            </div>

            <div className="flex gap-6">
              {[
                { label: "GitHub",  href: "https://github.com" },
                { label: "Twitter", href: "https://twitter.com" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground opacity-50 hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
