"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function AutoSliderBanner() {
  const handleShopClick = () => {
    const productSection = document.getElementById("product-section")
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <Image
        src="/jewelry/hero.png"
        alt="An arrangement of fine gold jewelry on ivory silk"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ivory/40" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 animate-fade-up text-xs uppercase tracking-[0.4em] text-charcoal/70">
          Desde 1984
        </p>
        <h1 className="max-w-3xl animate-fade-up text-balance font-serif text-5xl font-light leading-[1.05] tracking-tight text-charcoal sm:text-6xl md:text-7xl">
          Resaltá tu estilo con joyas hechas para durar.
        </h1>
        <p className="mt-8 max-w-md animate-fade-up text-pretty text-base leading-relaxed text-charcoal/70">
          Desde 1984, Magold trae lo mejor del diseño brasileño. Descubrí nuestra colección en oro y plata con el respaldo de 24 meses de garantía.
        </p>
        <Button
          onClick={handleShopClick}
          size="lg"
          className="mt-12 animate-fade-up rounded-none border border-charcoal bg-transparent px-12 py-6 text-xs uppercase tracking-[0.3em] text-charcoal transition-colors hover:bg-charcoal hover:text-ivory"
        >
          Ver Colección
        </Button>
      </div>
    </section>
  )
}
