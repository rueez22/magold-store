import Image from "next/image"

interface JewelryCardProps {
  name: string
  characteristics: string[]
  price: number
  image: string
}

export function HoodieCard({ name, characteristics, price, image }: JewelryCardProps) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-col pt-5">
        <h3 className="font-serif text-2xl font-medium leading-tight text-charcoal">{name}</h3>
        <ul className="mt-3 flex flex-col gap-1.5">
          {characteristics.map((item) => (
            <li key={item} className="flex items-baseline gap-2 text-sm leading-relaxed text-stone">
              <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-base tracking-wide text-charcoal">${price.toLocaleString()}</p>
        <a
          href={`https://wa.me/59170000000?text=Hola,%20me%20interesa%20el%20producto%20${encodeURIComponent(name)}%20de%20$${price.toLocaleString()}`}
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
