import { NextRequest, NextResponse } from 'next/server'
import { getToken } from '@auth/core/jwt'

const publicRoutes = ['/login', '/register']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
