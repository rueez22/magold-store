interface JewelryCardProps {
  name: string
  code: string | null
  features: string[]
  price: number
  image: string | null
}

export function HoodieCard({ name, code, features, price, image }: JewelryCardProps) {
  const formattedPrice = `Bs. ${price.toLocaleString("es-BO")}`
  const whatsappMessage = `Hola, ¿está disponible el producto "${name}" con código ${code ?? "sin código"}?`

  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col pt-5">
        <h3 className="font-serif text-2xl font-medium leading-tight text-charcoal">{name}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.15em] text-stone">
          Código: {code || "Sin código"}
        </p>
        <ul className="mt-3 flex flex-col gap-1.5">
          {features.map((item) => (
            <li key={item} className="flex items-baseline gap-2 text-sm leading-relaxed text-stone">
              <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-base tracking-wide text-charcoal">{formattedPrice}</p>
        <a
          href={`https://wa.me/59172815801?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex w-full items-center justify-center bg-charcoal px-6 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-cream transition-opacity hover:opacity-90"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </article>
  )
}
