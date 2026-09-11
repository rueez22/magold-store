"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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

export function ProductCreateDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [features, setFeatures] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  function resetForm() {
    setName("")
    setCode("")
    setFeatures("")
    setPrice("")
    setImage(null)
    setError("")
  }

  async function handleCreate() {
    setError("")

    const parsedPrice = Number(price)
    if (!name.trim() || !code.trim() || Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setError("Completa el nombre, el código y usa un precio válido.")
      return
    }

    setSaving(true)

    try {
      let imageUrl: string | null = null

      if (image) {
        imageUrl = await uploadProductImage(image)
      }

      const normalizedFeatures = features
        .split(",")
        .map((feature) => feature.trim())
        .filter(Boolean)

      const { error: insertError } = await supabaseBrowser
        .from("products")
        .insert({
          name: name.trim(),
          code: code.trim(),
          features: normalizedFeatures,
          price: parsedPrice,
          image_url: imageUrl,
        })

      if (insertError) {
        throw new Error(insertError.message)
      }

      setOpen(false)
      resetForm()
      router.refresh()
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "No se pudo crear el producto."
      )
    } finally {
      setSaving(false)
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) {
      resetForm()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Nuevo producto</Button>
      </DialogTrigger>

      <DialogContent className="border-stone/30 bg-ivory text-charcoal">
        <DialogHeader>
          <DialogTitle className="text-charcoal">Nuevo producto</DialogTitle>
          <DialogDescription className="text-stone">
            Agrega un producto con su código, información y su imagen.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="create-code" className="text-charcoal">
              Código
            </Label>
            <Input
              id="create-code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              className="border-stone/40 bg-white text-charcoal placeholder:text-stone"
              placeholder="Ej. AG-1024"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-name" className="text-charcoal">
              Nombre
            </Label>
            <Input
              id="create-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="border-stone/40 bg-white text-charcoal placeholder:text-stone"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-features" className="text-charcoal">
              Características
            </Label>
            <Input
              id="create-features"
              value={features}
              onChange={(event) => setFeatures(event.target.value)}
              placeholder="Característica 1, Característica 2"
              className="border-stone/40 bg-white text-charcoal placeholder:text-stone"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-price" className="text-charcoal">
              Precio
            </Label>
            <Input
              id="create-price"
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
          <Button onClick={handleCreate} disabled={saving}>
            {saving ? "Creando..." : "Crear producto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
