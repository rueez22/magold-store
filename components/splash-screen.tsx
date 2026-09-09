"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function SplashScreen() {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsComplete(true), 2200)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ivory transition-opacity duration-700",
        isComplete ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <span className="animate-fade-up font-serif text-3xl tracking-[0.4em] text-charcoal md:text-5xl">
        MAISON AURELLE
      </span>
      <div className="mt-8 h-px w-16 overflow-hidden bg-charcoal/15">
        <div className="h-full w-full origin-left animate-fade-up bg-gold" />
      </div>
      <span className="mt-6 animate-fade-up text-xs uppercase tracking-[0.35em] text-stone">Fine Jewelry</span>
    </div>
  )
}
