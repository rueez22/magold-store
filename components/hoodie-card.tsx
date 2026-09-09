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
      </div>
    </article>
  )
}
