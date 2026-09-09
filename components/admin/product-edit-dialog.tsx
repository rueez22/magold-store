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

type Product = {
  id: number
  name: string
  features: string[] | string | null
  price: number
}

export function ProductEditDialog({ product }: { product: Product }) {
  const initialFeatures = Array.isArray(product.features)
    ? product.features.join(", ")
    : product.features ?? ""

  const [open, setOpen] = useState(false)
  const [name, setName] = useState(product.name)
  const [features, setFeatures] = useState(initialFeatures)
  const [price, setPrice] = useState(String(product.price))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (nextOpen) {
      setName(product.name)
      setFeatures(initialFeatures)
      setPrice(String(product.price))
      setError("")
    }
  }

  async function handleSave() {
    setError("")

    const parsedPrice = Number(price)
    if (!name.trim() || Number.isNaN(parsedPrice)) {
      setError("Completa el nombre y usa un precio válido.")
      return
    }

    setSaving(true)

    const normalizedFeatures = features
      .split(",")
      .map((feature) => feature.trim())
      .filter(Boolean)

    const { error: updateError } = await supabaseBrowser
      .from("products")
      .update({
        name: name.trim(),
        features: normalizedFeatures,
        price: parsedPrice,
      })
      .eq("id", product.id)

    setSaving(false)

    if (updateError) {
      setError("No se pudieron guardar los cambios.")
      return
    }

    setOpen(false)
    window.location.reload()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Editar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
          <DialogDescription>
            Modifica el nombre, las características y el precio del producto.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`name-${product.id}`}>Nombre</Label>
            <Input
              id={`name-${product.id}`}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`features-${product.id}`}>Características</Label>
            <Input
              id={`features-${product.id}`}
              value={features}
              onChange={(event) => setFeatures(event.target.value)}
              placeholder="Característica 1, Característica 2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`price-${product.id}`}>Precio</Label>
            <Input
              id={`price-${product.id}`}
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>

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
