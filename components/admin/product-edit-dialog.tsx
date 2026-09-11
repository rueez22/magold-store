"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabaseBrowser } from "@/lib/supabase-browser"
import { ProductImageInput, uploadProductImage } from "./product-image-upload"

type Product = {
  id: number
  name: string
  code?: string | null
  features: string[] | string | null
  price: number
  image_url?: string | null
}

export function ProductEditDialog({ product }: { product: Product }) {
  const initialFeatures = Array.isArray(product.features)
    ? product.features.join(", ")
    : product.features ?? ""

  const [open, setOpen] = useState(false)
  const [name, setName] = useState(product.name)
  const [code, setCode] = useState(product.code ?? "")
  const [features, setFeatures] = useState(initialFeatures)
  const [price, setPrice] = useState(String(product.price))
  const [image, setImage] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (nextOpen) {
      setName(product.name)
      setCode(product.code ?? "")
      setFeatures(initialFeatures)
      setPrice(String(product.price))
      setImage(null)
      setError("")
    }
  }

  async function handleSave() {
    setError("")

    const parsedPrice = Number(price)
    if (!name.trim() || !code.trim() || Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setError("Completa el nombre, el código y usa un precio válido.")
      return
    }

    setSaving(true)

    try {
      let imageUrl = product.image_url ?? null

      if (image) {
        imageUrl = await uploadProductImage(image)
      }

      const normalizedFeatures = features
        .split(",")
        .map((feature) => feature.trim())
        .filter(Boolean)

      const { error: updateError } = await supabaseBrowser
        .from("products")
        .update({
          name: name.trim(),
          code: code.trim(),
          features: normalizedFeatures,
          price: parsedPrice,
          image_url: imageUrl,
        })
        .eq("id", product.id)

      if (updateError) {
        throw new Error(updateError.message)
      }

      setOpen(false)
      window.location.reload()
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "No se pudieron guardar los cambios."
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Editar
        </Button>
      </DialogTrigger>

      <DialogContent className="border-stone/30 bg-ivory text-charcoal">
        <DialogHeader>
          <DialogTitle className="text-charcoal">Editar producto</DialogTitle>
          <DialogDescription className="text-stone">
            Modifica el código, nombre, características, precio y la imagen del producto.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`code-${product.id}`} className="text-charcoal">
              Código
            </Label>
            <Input
              id={`code-${product.id}`}
              value={code}
              onChange={(event) => setCode(event.target.value)}
              className="border-stone/40 bg-white text-charcoal placeholder:text-stone"
              placeholder="Ej. AG-1024"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`name-${product.id}`} className="text-charcoal">
              Nombre
            </Label>
            <Input
              id={`name-${product.id}`}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="border-stone/40 bg-white text-charcoal placeholder:text-stone"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`features-${product.id}`} className="text-charcoal">
              Características
            </Label>
            <Input
              id={`features-${product.id}`}
              value={features}
              onChange={(event) => setFeatures(event.target.value)}
              placeholder="Característica 1, Característica 2"
              className="border-stone/40 bg-white text-charcoal placeholder:text-stone"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`price-${product.id}`} className="text-charcoal">
              Precio
            </Label>
            <Input
              id={`price-${product.id}`}
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="border-stone/40 bg-white text-charcoal placeholder:text-stone"
            />
          </div>

          <ProductImageInput value={image} onChange={setImage} />

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <DialogFooter>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
