'use client'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { registerUser } from '@/lib/actions/user.action'
import { toast } from 'sonner'

export default function LoginPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userCreated, setUserCreated] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(false)
    setUserCreated(false)
    const result = await registerUser(name, email, password)

    if (result.success) {
      setUserCreated(true)
    } else {
      toast.error(result.message)
      setError(true)
    }
  }

  return (
    <div>
      {userCreated && (
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>Registration success</AlertTitle>
          <AlertDescription>
            <p>User created. Now you can </p>
            <Link
              className={cn(
                'w-full cursor-pointer',
                buttonVariants({ variant: 'default' })
              )}
              href={'/login'}
            >
              Login
            </Link>
          </AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert variant='destructive'>
          <AlertCircleIcon />
          <AlertTitle>Registration error</AlertTitle>
          <AlertDescription>
            <p>An error has occurred. Please try again later</p>
          </AlertDescription>
        </Alert>
      )}
      {!userCreated && (
        <Card>
          <CardHeader>
            <CardTitle>Зарегистрироваться</CardTitle>
            <CardDescription>
              Введите свои имя, электронную почту и пароль
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-3'>
                  <Label htmlFor='name'>Имя пользователя</Label>
                  <Input
                    id='name'
                    type='name'
                    placeholder='Имя пользователя'
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='flex flex-col gap-3'>
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
                <div className='flex flex-col gap-3'>
                  <Label htmlFor='password'>Пароль</Label>
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
                    Зарегистрироваться
                  </Button>
                </div>
              </div>
              <div className='flex gap-2 items-center justify-center mt-4 text-sm'>
                Уже есть аккаунт?
                <Link href='/login' className='underline underline-offset-4'>
                  Войти
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
