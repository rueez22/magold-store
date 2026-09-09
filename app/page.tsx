import { HoodieCard } from "@/components/hoodie-card"
import { AutoSliderBanner } from "@/components/auto-slider-banner"
import { supabase } from "@/lib/supabase"

export default async function Home() {
  const { data: pieces, error } = await supabase
  .from("products")
  .select("id, name, features, price, image_url")
  .order("id", { ascending: true })

if (error) {
  throw new Error(`Failed to load products: ${error.message}`)
}
  

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
 <HoodieCard
    key={piece.id}
    name={piece.name}
    features={piece.features}
    price={piece.price}
    image={piece.image_url}
  />
))}
          </div>
        </div>
      </section>
    </main>
  )
}
