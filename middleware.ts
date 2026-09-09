import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: Request) {
  const response = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.headers.get("cookie")?.split("; ").map((cookie) => {
            const [name, ...value] = cookie.split("=")
            return {
              name,
              value: value.join("="),
            }
          }) ?? []
        },
        setAll() {
          // Cookies are refreshed by the authentication flow.
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && new URL(request.url).pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  return response
}

export const config = {
  matcher: ["/admin/:path*"],
}