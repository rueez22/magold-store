import { HoodieCard } from "@/components/hoodie-card"
import { AutoSliderBanner } from "@/components/auto-slider-banner"

export default function Home() {
  const pieces = [
    {
      id: 1,
      name: "Solitaire Aurelle",
      characteristics: ["18k yellow gold", "3.2 g", "1.05 ct brilliant diamond"],
      price: 4200,
      image: "/jewelry/ring.png",
    },
    {
      id: 2,
      name: "Lumière Pendant",
      characteristics: ["18k yellow gold", "4.1 g", "0.45 ct diamond"],
      price: 1850,
      image: "/jewelry/necklace.png",
    },
    {
      id: 3,
      name: "Perle Drop Earrings",
      characteristics: ["18k gold", "5.6 g", "8 mm Akoya pearls"],
      price: 1290,
      image: "/jewelry/earrings.png",
    },
    {
      id: 4,
      name: "Rivière Bracelet",
      characteristics: ["18k white gold", "12.4 g", "4.80 ct diamonds"],
      price: 6800,
      image: "/jewelry/bracelet.png",
    },
  ]

  return (
    <main id="top" className="flex min-h-screen flex-col">
      <AutoSliderBanner />

      <section id="product-section" className="w-full bg-ivory">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-36">
          <div className="mb-20 flex flex-col items-center gap-4 text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-gold">The Collection</span>
            <h2 className="font-serif text-4xl font-light tracking-tight text-charcoal md:text-5xl">
              Signature Pieces
            </h2>
            <p className="max-w-lg text-pretty text-sm leading-relaxed text-stone">
              A selection of our most enduring designs, each accompanied by a certificate of authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {pieces.map((piece) => (
              <HoodieCard key={piece.id} {...piece} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
