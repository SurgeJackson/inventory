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
import { IUser, IWarehouse } from '@/models/interfaces'
import { toast } from 'sonner'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { getAllWarehouses } from '@/lib/actions/warehouse.action'
import useSWR from 'swr'
import { createZone, updateZone } from '@/lib/actions/zone.action'
import { useSession } from 'next-auth/react'

export function ZoneSheet({
  isSheetOpen,
  setIsSheetOpen,
  selectedRowData,
}: {
  isSheetOpen: boolean
  setIsSheetOpen: (open: boolean) => void
  selectedRowData: IUser | null
}) {
  const warehouse = useSession().data?.user?.warehouse
  const currentUser = useSession().data?.user

  const [name, setName] = useState(selectedRowData?.name || '')
  const [open, setOpen] = useState(false)
  const [warehouseId, setWarehouseId] = useState(
    selectedRowData?.warehouse?._id.toString() || warehouse?._id || ''
  )

  const { data: warehouses } = useSWR('getAllWarehouses', {
    fetcher: async () => {
      const res = await getAllWarehouses()
      return res.warehouses
    },
  })

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={() => {
        setIsSheetOpen(!isSheetOpen)
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Редактировать зону хранения</SheetTitle>
          <SheetDescription>
            Отредактируйте зону хранения. Нажмите Сохранить изменения, когда
            закончите.
          </SheetDescription>
        </SheetHeader>
        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          <div className='grid gap-3'>
            <Label htmlFor='sheet-name'>Название зоны хранения</Label>
            <Input
              id='sheet-name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='grid gap-3'>
            <Label htmlFor='sheet-warehouse'>Склад</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className='w-full justify-between'
                  disabled={!currentUser?.isAdmin}
                >
                  {warehouseId
                    ? warehouses?.find(
                        (warehouse: IWarehouse) =>
                          warehouse._id.toString() === warehouseId
                      )?.name
                    : 'Выберите склад...'}
                  <ChevronsUpDown className='opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent id='sheet-warehouse' className='w-full p-0'>
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {warehouses?.map((warehouse: IWarehouse) => (
                        <CommandItem
                          key={warehouse._id.toString()}
                          value={warehouse._id.toString()}
                          onSelect={(currentValue) => {
                            setWarehouseId(
                              currentValue === warehouseId ? '' : currentValue
                            )
                            setOpen(false)
                          }}
                        >
                          {warehouse.name}
                          <Check
                            className={cn(
                              'ml-auto',
                              warehouseId === warehouse._id.toString()
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <SheetFooter>
          <Button
            type='submit'
            onClick={() => {
              if (selectedRowData?._id !== undefined) {
                updateZone(selectedRowData._id.toString(), {
                  name: name,
                  warehouse: warehouses?.find(
                    (warehouse: IWarehouse) =>
                      warehouse._id.toString() === warehouseId
                  ),
                }).then((res) =>
                  res.success
                    ? toast.success(res.message)
                    : toast.error(res.message)
                )
              } else {
                createZone(
                  name,
                  warehouses?.find(
                    (warehouse: IWarehouse) =>
                      warehouse._id.toString() === warehouseId
                  )
                ).then((res) =>
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
