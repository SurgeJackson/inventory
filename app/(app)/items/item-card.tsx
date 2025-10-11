import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ItemImage from './item-image'
import { CircleCheckBig, CircleX } from 'lucide-react'
import { ICategory, IItem, IZone } from '@/models/interfaces'

export default function ItemCard({
  item,
  setSelectedItem,
  setIsDialogOpen,
}: {
  item: IItem
  setSelectedItem: (item: IItem) => void
  setIsDialogOpen: (open: boolean) => void
}) {
  const key = String(item._id ?? item.sku)

  return (
    <Card
      key={key}
      className='cursor-pointer gap-2 p-2'
      onClick={() => {
        setSelectedItem(item)
        setIsDialogOpen(true)
      }}
    >
      <CardHeader className='p-0'>
        <ItemImage item={item} />
        <CardTitle className='text-center'>{item.sku}</CardTitle>
        <CardDescription className='text-center'>
          <p>{item.name}</p>
        </CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col items-center justify-center p-0'>
        {item.code ? (
          <CircleCheckBig className='w-8 h-8 text-green-600' strokeWidth={2} />
        ) : (
          <CircleX className='w-8 h-8 text-red-700' strokeWidth={2} />
        )}
      </CardContent>

      <CardFooter className='flex flex-col items-center justify-center p-0 text-[11px]'>
        <p className='truncate w-full text-center'>{item.code}</p>
        <p>{(item.category as ICategory)?.name}</p>
        <p>{(item.zone as IZone)?.name}</p>
      </CardFooter>
    </Card>
  )
}
