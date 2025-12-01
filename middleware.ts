import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Pour l'instant, désactiver le middleware et laisser la vérification côté client
  // Le problème est que les cookies Supabase ne sont pas toujours accessibles côté serveur
  
  console.log('Middleware - Accès autorisé (vérification côté client)')
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/submit-project/:path*', '/admin/:path*'],
}
