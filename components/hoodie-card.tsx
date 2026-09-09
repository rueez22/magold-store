"use client"

import Image from "next/image"

interface JewelryCardProps {
  name: string
  material: string
  price: number
  image: string
}

export function HoodieCard({ name, material, price, image }: JewelryCardProps) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-col items-center gap-1 pt-6 text-center">
        <h3 className="font-serif text-xl font-medium text-charcoal">{name}</h3>
        <p className="text-xs uppercase tracking-[0.2em] text-stone">{material}</p>
        <p className="mt-2 text-sm text-charcoal/80">${price.toLocaleString()}</p>
        <button className="mt-4 border-b border-charcoal/30 pb-1 text-xs uppercase tracking-[0.25em] text-charcoal transition-colors hover:border-gold hover:text-gold">
          Enquire
        </button>
      </div>
    </article>
  )
}
