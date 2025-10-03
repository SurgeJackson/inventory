import { Toaster } from 'sonner'
import './globals.css'
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import Providers from './providers'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth() // runs on server

  return (
    <html lang='en'>
      <body className='antialiased'>
        <Providers session={session}>
          <main className='w-full'>{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
