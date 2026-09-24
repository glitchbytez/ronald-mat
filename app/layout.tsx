import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { IM_Fell_English, Shippori_Mincho, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { InkCursor }  from "@/components/ink-cursor"
import { LiveClock }  from "@/components/live-clock"
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
          {/* Physics-based ink cursor */}
          <InkCursor />

          {/* ── Global Header ── */}
          <header className="fixed top-0 left-0 right-0 h-14 px-8 flex items-center justify-between z-50 bg-background/95 border-b border-border/30">
            {/* Logo */}
            <Link
              href="/"
              className="font-display font-normal text-xs tracking-[0.22em] uppercase opacity-75 hover:opacity-100 transition-opacity duration-500"
            >
              <span className="hidden sm:inline">Ronald Mat</span>
              <span className="sm:hidden">RM</span>
            </Link>

            {/* Live clock — signals the site is alive */}
            <LiveClock />

            {/* Nav */}
            <nav className="flex gap-10">
              {(["Projects", "Writing", "Contact"] as const).map((label) => (
                <Link
                  key={label}
                  href={
                    label === "Contact"
                      ? "mailto:ronald@mat.dev"
                      : `/${label.toLowerCase()}`
                  }
                  className="font-sans text-[10px] tracking-[0.18em] uppercase text-muted-foreground opacity-45 hover:opacity-90 transition-opacity duration-500"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </header>

          {/* Main content */}
          <div className="flex-1 flex flex-col pt-24 pb-24 animate-wabi-in">
            {children}
          </div>

          {/* ── Global Footer — barely there ── */}
          <footer className="fixed bottom-0 left-0 right-0 py-4 px-8 flex justify-between items-center z-50 bg-background/95 border-t border-border/20">
            <span className="font-mono text-[10px] text-muted-foreground opacity-30 tracking-widest">
              &copy; 2025 Ronald Mat
            </span>
            <div className="flex gap-6">
              {[
                { label: "GitHub",  href: "https://github.com" },
                { label: "Twitter", href: "https://twitter.com" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground opacity-30 hover:opacity-70 transition-opacity duration-500"
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
