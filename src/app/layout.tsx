import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { RecruiterProvider } from "@/components/sections/RecruiterMode"
import { LanguageProvider } from "@/hooks/useLanguage"
import { SmoothScroll } from "@/components/shared/SmoothScroll"
import { MagneticCursor } from "@/components/shared/MagneticCursor"

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: "Karine Miranda — Full Stack Engineer",
  description:
    "Full Stack Engineer at Globo. Building high-performance digital architectures with a Brazilian heart.",
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
  themeColor: "#0d0608",
  colorScheme: "dark",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-void-950 text-text-primary has-magnetic-cursor">
        <LanguageProvider>
          <RecruiterProvider>
            <SmoothScroll>
              <MagneticCursor />
              <Navbar />
              <main>{children}</main>
              <Footer />
            </SmoothScroll>
          </RecruiterProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
