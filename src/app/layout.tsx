import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { RecruiterProvider } from "@/components/sections/RecruiterMode"
import { LanguageProvider } from "@/hooks/useLanguage"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Karine Miranda — Full Stack Engineer",
  description:
    "Full Stack Engineer at Globo. Building web applications with Vue.js, TypeScript, Next.js, Python, and FastAPI. Open to remote opportunities worldwide.",
  keywords: [
    "Full Stack Engineer",
    "Vue.js",
    "TypeScript",
    "React",
    "Next.js",
    "Python",
    "FastAPI",
    "Software Engineer",
    "Brazil",
    "Remote",
    "Karine Miranda",
  ],
  authors: [{ name: "Karine Miranda", url: "https://github.com/km2s" }],
  creator: "Karine Miranda",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "pt_BR",
    title: "Karine Miranda — Full Stack Engineer",
    description:
      "Full Stack Engineer at Globo. Building with Vue.js, TypeScript, Next.js, Python, and FastAPI.",
    siteName: "Karine Miranda Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karine Miranda — Full Stack Engineer",
    description: "Full Stack Engineer at Globo. Open to remote opportunities worldwide.",
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#0d0d1a",
  colorScheme: "dark",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-void-900 text-purple-100`}
      >
        <LanguageProvider>
          <RecruiterProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </RecruiterProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
