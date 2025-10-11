import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FlatItem } from '@/models/interfaces'
import { useSession } from 'next-auth/react'

export default function ItemCard({
  item,
  handleAccept,
  handleIgnore,
  handleOpenDialog,
  handleMouseEnter,
}: {
  item: FlatItem
  handleAccept: (sku: string, name: string) => void
  handleIgnore: (sku: string) => void
  handleOpenDialog: (sku: string) => void
  handleMouseEnter: () => void
}) {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <Card key={`${item.sku}-${item.qty}`}>
      <CardHeader>
        <CardTitle className='text-center'>{item.sku}</CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col gap-2 items-center justify-center p-0'>
        <CardDescription className='text-center text-xs'>
          {item.name}
        </CardDescription>
        <CardDescription className='text-center text-sm'>
          Количество: {item.qty}
        </CardDescription>
      </CardContent>

      <CardFooter className='flex flex-col gap-2'>
        {item.qty > 0 ? (
          <div className='flex flex-col gap-2'>
            <Button
              className='w-full text-xs cursor-pointer'
              onClick={() => handleAccept(item.sku, item.name)}
            >
              Принять на склад
            </Button>

            {user?.isAdmin && (
              <Button
                variant='outline'
                className='w-full text-xs cursor-pointer'
                onClick={() => handleIgnore(item.sku)}
              >
                Не учитывать
              </Button>
            )}
          </div>
        ) : (
          <Button
            variant='destructive'
            className='w-full text-xs cursor-pointer'
            onMouseEnter={handleMouseEnter}
            onClick={() => handleOpenDialog(item.sku)}
          >
            Списать со склада
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
