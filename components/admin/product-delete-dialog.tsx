"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { supabaseBrowser } from "@/lib/supabase-browser"

type Product = {
  id: number
  name: string
}

export function ProductDeleteDialog({ product }: { product: Product }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)

    const { error } = await supabaseBrowser
      .from("products")
      .delete()
      .eq("id", product.id)

    if (error) {
      setLoading(false)
      return
    }

    router.refresh()
    setLoading(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Eliminar
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="border-charcoal bg-ivory text-charcoal">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-charcoal">
            ¿Eliminar producto?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-stone">
            Esta acción eliminará permanentemente “{product.name}” del catálogo.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={loading}
            className="border-charcoal bg-white text-charcoal hover:bg-white/80"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
