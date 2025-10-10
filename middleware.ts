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

// // middleware.ts
// import { NextRequest, NextResponse } from 'next/server'
// import { getToken } from 'next-auth/jwt' // <-- use next-auth/jwt
// const publicRoutes = ['/login', '/register']

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname
//   console.log(path)

//   // allow public routes
//   if (publicRoutes.includes(path)) return NextResponse.next()

//   console.log(request)
//   console.log(process.env.AUTH_SECRET)

//   // IMPORTANT: secret + proper URL/secure cookies in prod
//   const token = await getToken({
//     req: request,
//     secret: process.env.AUTH_SECRET,
//   }).catch((err) => console.log(err))
//   console.log(token)

//   if (!token) {
//     const url = new URL('/login', request.url)
//     // optional: keep redirectBack param
//     url.searchParams.set('next', path)
//     return NextResponse.redirect(url)
//   }
//   return NextResponse.next()
// }

// export const config = {
//   // exclude next-auth endpoints to avoid loops
//   matcher: ['/((?!api/auth|_next/static|_next/image|favicon\\.ico).*)'],
// }
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const PUBLIC = new Set(['/login', '/register'])

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Allow public routes
  if (PUBLIC.has(path)) return NextResponse.next()

  // Try to read the session token (Auth.js v5 cookie names below)
  const secret = process.env.AUTH_SECRET
  let token = await getToken({ req, secret }).catch(() => null)

  // If not found, explicitly try the secure cookie name (prod https)
  if (!token) {
    token = await getToken({
      req,
      secret,
      cookieName: '__Secure-authjs.session-token', // v5 secure cookie
    }).catch(() => null)
  }

  if (!token) {
    const url = new URL('/login', req.url)
    url.searchParams.set('next', path)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  // Avoid loops on auth endpoints and skip static assets
  matcher: [
    '/((?!api/images|api/auth|_next/static|_next/image|favicon.ico|robots.txt).*)',
  ],
}
