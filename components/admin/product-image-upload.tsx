"use client"

import { ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabaseBrowser } from "@/lib/supabase-browser"

const BUCKET = "product-images"

export async function uploadProductImage(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Selecciona un archivo de imagen válido.")
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("La imagen no puede superar los 5 MB.")
  }

  const extension = file.name.split(".").pop() || "jpg"
  const path = `${crypto.randomUUID()}.${extension}`

  const { error: uploadError } = await supabaseBrowser.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (uploadError) {
    throw new Error(uploadError.message)
  }

  const { data } = supabaseBrowser.storage
    .from(BUCKET)
    .getPublicUrl(path)

  return data.publicUrl
}

export function ProductImageInput({
  value,
  onChange,
}: {
  value: File | null
  onChange: (file: File | null) => void
}) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.files?.[0] ?? null)
  }

  return (
    <div className="space-y-2">
      <Label className="text-charcoal">Imagen</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="border-stone/40 bg-white text-charcoal file:mr-4 file:border-0 file:bg-charcoal file:px-3 file:py-1 file:text-sm file:text-white"
      />
      <p className="text-xs text-stone">
        JPG, PNG o WebP. Máximo 5 MB.
      </p>
      {value && (
        <p className="text-xs text-charcoal">
          Archivo seleccionado: {value.name}
        </p>
      )}
    </div>
  )
}
