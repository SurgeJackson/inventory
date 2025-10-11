import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ICategory, IItem, IZone } from '@/models/interfaces'

export default function RemoveDialog({
  items,
  selectedItemSKU,
  handleDeleteItem,
  isDialogOpen,
  setIsDialogOpen,
}: {
  items: IItem[]
  selectedItemSKU: string
  handleDeleteItem: (id: string) => void
  isDialogOpen: boolean
  setIsDialogOpen: (open: boolean) => void
}) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{selectedItemSKU || '—'}</DialogTitle>
        </DialogHeader>
        <div className='grid grid-cols-3 gap-1 text-xs'>
          {items?.map((it: IItem) => (
            <Card
              className='cursor-pointer p-2'
              key={String(it._id)}
              onClick={() => handleDeleteItem(String(it._id))}
            >
              <CardHeader className='p-0'>
                <CardTitle className='text-center text-xs truncate'>
                  {it.sku}
                </CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col gap-2 items-center justify-center p-0'>
                <CardDescription className='flex flex-col gap-1 text-center text-xs'>
                  <p>{(it.zone as IZone)?.name}</p>
                  <p>{it.code}</p>
                  <p>{(it.category as ICategory)?.name}</p>
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
