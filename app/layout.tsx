import "./globals.css"
import type { Metadata } from "next"
import { Cormorant_Garamond, Jost } from "next/font/google"
import type React from "react"
import { SplashScreen } from "@/components/splash-screen"
import { Logo } from "@/components/logo"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
})

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
})

export const metadata: Metadata = {
  title: "MAGOLD — JOYERIA ",
  description: "Catálogo exclusivo de joyas",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${jost.variable}`}>
      <body className="bg-ivory font-sans text-charcoal antialiased">
        <SplashScreen />
        <header className="fixed top-0 left-0 z-50 w-full">
          <div className="flex items-center justify-center py-6">
            <Logo />
          </div>
        </header>
        {children}
        <footer className="w-full border-t border-charcoal/10 bg-ivory">
          <div className="mx-auto max-w-6xl px-6 py-16 md:px-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="font-serif text-2xl tracking-[0.2em] text-charcoal">MAISON AURELLE</span>
              <p className="max-w-md text-sm leading-relaxed text-stone">
                Fine jewelry, ethically sourced and crafted by hand in our atelier.
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.25em] text-stone">
                &copy; {new Date().getFullYear()} Maison Aurelle. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
