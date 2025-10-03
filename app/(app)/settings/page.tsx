'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { compareItems, createItem } from '@/lib/actions/item.actions'
import { useSession } from 'next-auth/react'
import { Key, useEffect } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'

export default function DemoPage() {
  const warehouse = useSession().data?.user?.warehouse

  const { data, mutate } = useSWR(`compareItems(${warehouse._id})`, {
    fetcher: async () => {
      const res = await compareItems(warehouse)
      return res.items
    },
    revalidateOnMount: false,
    revalidateOnFocus: false,
  })

  useEffect(() => {
    mutate()
  })

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 text-xs'>
      {data?.map(
        (
          item: { sku: string; name: string; qty: number },
          index: Key | null | undefined
        ) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className='text-center'>{item.sku}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-2 text-center items-center justify-center p-0 text-[6px]'>
              <CardDescription className='text-center text-xs'>
                {item.name}
              </CardDescription>
              <CardDescription className='text-center text-sm'>
                Количество: {item.qty}
              </CardDescription>
            </CardContent>
            <CardFooter className='flex flex-col gap-2'>
              {item.qty > 0 ? (
                <Button
                  className='cursor-pointer w-full text-xs'
                  onClick={() => {
                    createItem({
                      ...item,
                      warehouseId: warehouse._id.toString(),
                    }).then((res) =>
                      res.success
                        ? toast.success(res.message)
                        : toast.error(res.message)
                    )
                    mutate()
                  }}
                >
                  Принять на склад
                </Button>
              ) : (
                <Button className='cursor-pointer w-full'>
                  Списать со склада
                </Button>
              )}
            </CardFooter>
          </Card>
        )
      )}
    </div>
  )
}
