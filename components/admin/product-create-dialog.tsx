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

export function ProductCreateDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [features, setFeatures] = useState("")
  const [price, setPrice] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  function resetForm() {
    setName("")
    setFeatures("")
    setPrice("")
    setError("")
  }

  async function handleCreate() {
    setError("")

    const parsedPrice = Number(price)
    if (!name.trim() || Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setError("Completa el nombre y usa un precio válido.")
      return
    }

    setSaving(true)

    const normalizedFeatures = features
      .split(",")
      .map((feature) => feature.trim())
      .filter(Boolean)

    const { error: insertError } = await supabaseBrowser
      .from("products")
      .insert({
        name: name.trim(),
        features: normalizedFeatures,
        price: parsedPrice,
      })

    setSaving(false)

    if (insertError) {
      setError("No se pudo crear el producto.")
      return
    }

    setOpen(false)
    resetForm()
    router.refresh()
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo producto</DialogTitle>
          <DialogDescription>
            Agrega un producto al catálogo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="create-name">Nombre</Label>
            <Input
              id="create-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-features">Características</Label>
            <Input
              id="create-features"
              value={features}
              onChange={(event) => setFeatures(event.target.value)}
              placeholder="Característica 1, Característica 2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="create-price">Precio</Label>
            <Input
              id="create-price"
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
          <Button onClick={handleCreate} disabled={saving}>
            {saving ? "Creando..." : "Crear producto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
