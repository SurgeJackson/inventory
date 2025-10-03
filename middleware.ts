// import { NextRequest, NextResponse } from 'next/server'
// import { getToken } from '@auth/core/jwt'

// const publicRoutes = ['/login', '/register']

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname
//   const isPublicRoute = publicRoutes.includes(path)

//   const token = await getToken({
//     req: request,
//     secret: process.env.AUTH_SECRET,
//   })

//   if (!isPublicRoute && !token) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   return NextResponse.next()
// }

// // Routes Middleware should not run on
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }

// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt' // <-- use next-auth/jwt
const publicRoutes = ['/login', '/register']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // allow public routes
  if (publicRoutes.includes(path)) return NextResponse.next()

  // IMPORTANT: secret + proper URL/secure cookies in prod
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })
  if (!token) {
    const url = new URL('/login', request.url)
    // optional: keep redirectBack param
    url.searchParams.set('next', path)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  // exclude next-auth endpoints to avoid loops
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon\\.ico).*)'],
}
