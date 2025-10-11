import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import ImageDialog from './image-dialog'
import CategoriesGroup from './categories-toggle-group'
import ZonesGroup from './zones-toggle-group'
import { ICategory, IItem, IZone } from '@/models/interfaces'

export default function ItemDialog({
  selectedItem,
  handleQRDelete,
  handleEnterInInput,
  isDialogOpen,
  setIsDialogOpen,
  mutate,
  handleCategoryChange,
  handleZoneChange,
}: {
  selectedItem: IItem
  handleQRDelete: () => void
  handleEnterInInput: (e: React.KeyboardEvent<HTMLInputElement>) => void
  isDialogOpen: boolean
  setIsDialogOpen: (open: boolean) => void
  mutate: () => void
  handleCategoryChange: (value: string) => void
  handleZoneChange: (value: string) => void
}) {
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => {
        if (isDialogOpen) mutate()
        setIsDialogOpen(!isDialogOpen)
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{selectedItem?.sku}</DialogTitle>
          <DialogDescription>{selectedItem?.name}</DialogDescription>
        </DialogHeader>

        <div className='flex items-center gap-2'>
          {selectedItem?.code ? (
            <div className='flex items-center justify-around gap-2'>
              <Label htmlFor='qr-value'>{selectedItem.code}</Label>
              <Button size='sm' variant='outline' onClick={handleQRDelete}>
                <X className='w-5 h-5' strokeWidth={1} />
              </Button>
            </div>
          ) : (
            <Input
              id='qr-input'
              placeholder='Отсканируйте QR'
              onKeyDown={handleEnterInInput}
              defaultValue=''
            />
          )}
        </div>
        <ImageDialog selectedItem={selectedItem} />
        <DialogFooter>
          <div className='flex flex-col items-center gap-2 w-full'>
            <CategoriesGroup
              showAll={false}
              handleValueChange={handleCategoryChange}
              defaultValue={(
                selectedItem?.category as ICategory
              )?._id?.toString()}
            />
            <ZonesGroup
              showAll={false}
              handleValueChange={handleZoneChange}
              defaultValue={(selectedItem?.zone as IZone)?._id?.toString()}
            />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
