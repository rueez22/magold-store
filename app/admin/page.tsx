import { createSupabaseServerClient } from "@/lib/supabase-server"
import { ProductEditDialog } from "@/components/admin/product-edit-dialog"
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
    .select("id, name, features, price")
    .order("id", { ascending: true })

  if (error) {
    throw new Error(`Failed to load products: ${error.message}`)
  }

  return (
    <main className="min-h-screen bg-ivory p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif text-4xl text-charcoal">
          Panel de administración
        </h1>

        <p className="mt-2 text-sm text-stone">
          Gestiona los productos de tu catálogo.
        </p>

        <div className="mt-8 overflow-hidden rounded-lg border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Características</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead className="w-[120px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium text-charcoal">
                    {product.name}
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
                    <ProductEditDialog product={product} />
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
