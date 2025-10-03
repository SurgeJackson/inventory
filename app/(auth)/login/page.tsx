'use client'
import { Suspense, useState } from 'react'
import { signIn } from 'next-auth/react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import LoginError from './LoginError'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/items',
      redirect: true,
    })
  }

  function LoginErrorFallback() {
    return <>placeholder</>
  }

  return (
    <>
      <Suspense fallback={<LoginErrorFallback />}>
        <LoginError />
      </Suspense>
      <Card>
        <CardHeader>
          <CardTitle>Войти в свой аккаунт</CardTitle>
          <CardDescription>
            Введите свою электронную почту и пароль
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Пароль</Label>
                  <Link
                    href='#'
                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                  >
                    Забыли пароль?
                  </Link>
                </div>
                <Input
                  id='password'
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='flex flex-col gap-3'>
                <Button type='submit' className='w-full cursor-pointer'>
                  Войти
                </Button>
              </div>
            </div>
            <div className='flex gap-2 items-center justify-center mt-4 text-sm'>
              Нет аккаунта?
              <Link href='/register' className='underline underline-offset-4'>
                Зарегистрироваться
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
