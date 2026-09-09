"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Product = {
  id: number
  name: string
  features: string[] | string | null
  price: number
}

export function ProductEditDialog({ product }: { product: Product }) {
  const features = Array.isArray(product.features)
    ? product.features.join(", ")
    : product.features ?? ""

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Editar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
          <DialogDescription>
            Modifica los datos del producto y guarda los cambios en el siguiente paso.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`name-${product.id}`}>Nombre</Label>
            <Input id={`name-${product.id}`} defaultValue={product.name} />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`features-${product.id}`}>Características</Label>
            <Input id={`features-${product.id}`} defaultValue={features} />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`price-${product.id}`}>Precio</Label>
            <Input
              id={`price-${product.id}`}
              type="number"
              step="0.01"
              defaultValue={product.price}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
