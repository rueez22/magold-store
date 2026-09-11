import { createSupabaseServerClient } from "@/lib/supabase-server"
import { ProductEditDialog } from "@/components/admin/product-edit-dialog"
import { ProductDeleteDialog } from "@/components/admin/product-delete-dialog"
import { ProductCreateDialog } from "@/components/admin/product-create-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient()
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, code, features, price, image_url")
    .order("id", { ascending: true })

  if (error) {
    throw new Error(`Failed to load products: ${error.message}`)
  }

  return (
    <main className="min-h-screen bg-ivory p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl text-charcoal">
              Panel de administración
            </h1>

            <p className="mt-2 text-sm text-stone">
              Gestiona los productos de tu catálogo.
            </p>
          </div>

          <ProductCreateDialog />
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Características</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead className="w-[180px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium text-charcoal">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-16 w-16 rounded-md border border-stone/20 object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-md border border-stone/20 bg-ivory text-xs text-stone">
                          Sin imagen
                        </div>
                      )}
                      <div>
                        <div>{product.name}</div>
                        <div className="mt-1 text-xs font-normal uppercase tracking-[0.15em] text-stone">
                          Código: {product.code || "Sin código"}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-stone">
                    {Array.isArray(product.features)
                      ? product.features.join(", ")
                      : product.features}
                  </TableCell>
                  <TableCell className="text-charcoal">
                    {product.price}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ProductEditDialog product={product} />
                      <ProductDeleteDialog product={product} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  )
}
