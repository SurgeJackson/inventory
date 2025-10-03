import { redirect } from 'next/navigation'
import { auth } from './api/auth/[...nextauth]/auth'

export default async function Home() {
  const session = await auth()
  if (!session) redirect('/login')
  redirect('/items')
}
