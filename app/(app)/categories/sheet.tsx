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
import { createCategory, updateCategory } from '@/lib/actions/category.actions'
import { ICategory } from '@/models/interfaces'
import { toast } from 'sonner'

export function CategorySheet({
  isSheetOpen,
  setIsSheetOpen,
  selectedRowData,
}: {
  isSheetOpen: boolean
  setIsSheetOpen: (open: boolean) => void
  selectedRowData: ICategory | null
}) {
  const [name, setName] = useState(selectedRowData?.name || '')

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={() => {
        setIsSheetOpen(!isSheetOpen)
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Редактировать категорию</SheetTitle>
          <SheetDescription>
            Отредактируйте категорию. Нажмите Сохранить изменения, когда
            закончите.
          </SheetDescription>
        </SheetHeader>
        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          <div className='grid gap-3'>
            <Label htmlFor='sheet-demo-name'>Название категории</Label>
            <Input
              id='sheet-demo-name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <Button
            type='submit'
            onClick={() => {
              if (selectedRowData?._id !== undefined) {
                updateCategory(selectedRowData._id.toString(), name).then(
                  (res) =>
                    res.success
                      ? toast.success(res.message)
                      : toast.error(res.message)
                )
              } else {
                createCategory(name).then((res) =>
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
