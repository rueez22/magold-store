import { HoodieCard } from "@/components/hoodie-card"
import { AutoSliderBanner } from "@/components/auto-slider-banner"

export default function Home() {
  const pieces = [
    {
      id: 1,
      name: "Anillo de Oro 18k con Diamante",
      features: ["Oro amarillo 18k", "Peso 3.2 g", "Diamante 1.05 ct", "Talla brillante", "Certificado GIA"],
      price: 29400,
      image: "/jewelry/ring.png",
    },
    {
      id: 2,
      name: "Collar de Perlas",
      features: ["Perlas Akoya 8 mm", "Broche oro 18k", "Largo 45 cm", "42 perlas", "Lustre AAA"],
      price: 12950,
      image: "/jewelry/necklace.png",
    },
    {
      id: 3,
      name: "Pulsera de Plata 925",
      features: ["Plata esterlina 925", "Peso 12.4 g", "Largo 19 cm", "Cierre mosquetón", "Acabado pulido"],
      price: 3200,
      image: "/jewelry/silver-bracelet.png",
    },
    {
      id: 4,
      name: "Aretes de Oro con Perlas",
      features: ["Oro 18k", "Peso 5.6 g", "Perlas Akoya 8 mm", "Cierre presión", "Par simétrico"],
      price: 9030,
      image: "/jewelry/earrings.png",
    },
  ]

  return (
    <main id="top" className="flex min-h-screen flex-col">
      <AutoSliderBanner />

      <section id="product-section" className="w-full bg-ivory">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-36">
          <div className="mb-20 flex flex-col items-center gap-4 text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-gold">La Colección</span>
            <h2 className="font-serif text-4xl font-light tracking-tight text-charcoal md:text-5xl">
              Piezas Destacadas
            </h2>
            <p className="max-w-lg text-pretty text-sm leading-relaxed text-stone">
              Una selección de nuestros diseños más duraderos.
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
