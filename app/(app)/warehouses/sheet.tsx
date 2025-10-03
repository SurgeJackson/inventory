import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useState } from 'react'
import {
  createWarehouse,
  updateWarehouse,
} from '@/lib/actions/warehouse.action'
import { IWarehouse } from '@/models/interfaces'
import { toast } from 'sonner'

export function WarehouseSheet({
  isSheetOpen,
  setIsSheetOpen,
  selectedRowData,
}: {
  isSheetOpen: boolean
  setIsSheetOpen: (open: boolean) => void
  selectedRowData: IWarehouse | null
}) {
  const [name, setName] = useState(selectedRowData?.name || '')
  const [id1c, setId1c] = useState(selectedRowData?.id1c || '')

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={() => {
        setIsSheetOpen(!isSheetOpen)
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Редактировать склад</SheetTitle>
          <SheetDescription>
            Отредактируйте склад. Нажмите Сохранить изменения, когда закончите.
          </SheetDescription>
        </SheetHeader>
        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          <div className='grid gap-3'>
            <Label htmlFor='sheet-name'>Название склада</Label>
            <Input
              id='sheet-name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='sheet-id1c'>1C ID</Label>
            <Input
              id='id1c'
              value={id1c}
              onChange={(e) => setId1c(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <Button
            type='submit'
            onClick={() => {
              if (selectedRowData?._id !== undefined) {
                updateWarehouse(selectedRowData._id.toString(), {
                  name,
                  id1c,
                }).then((res) =>
                  res.success
                    ? toast.success(res.message)
                    : toast.error(res.message)
                )
              } else {
                createWarehouse({ name, id1c }).then((res) =>
                  res.success
                    ? toast.success(res.message)
                    : toast.error(res.message)
                )
              }
              setIsSheetOpen(false)
            }}
          >
            Сохранить изменения
          </Button>
          <SheetClose asChild>
            <Button variant='outline'>Закрыть</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
