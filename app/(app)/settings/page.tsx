'use client'
import { useSession } from 'next-auth/react'
import useSWR, { preload } from 'swr'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  compareItems,
  createIgnoreItem,
  createItem,
  deleteItem,
  getAllItemsBySKU,
} from '@/lib/actions/item.actions'
import type { ICategory, IItem, IWarehouse, IZone } from '@/models/interfaces'
import { useEffect, useState } from 'react'

const fetcher = <T,>(fn: () => Promise<T>) => fn()

export default function DemoPage() {
  const { data: session } = useSession()
  const user = session?.user
  const warehouse = user?.warehouse as IWarehouse
  const warehouseId = warehouse?._id?.toString()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedItemSKU, setSelectedItemSKU] = useState<string>('')

  // Diff list (1C vs Mongo)
  const diffKey = warehouseId ? ['compareItems', warehouseId] : null
  const { data: diffs, mutate: mutateDiffs } = useSWR(
    diffKey,
    () => fetcher(async () => (await compareItems(warehouse)).items),
    { revalidateOnMount: true, revalidateOnFocus: false }
  )

  // Items by SKU (only when dialog is open)
  const itemsKey =
    isDialogOpen && warehouseId && selectedItemSKU
      ? ['itemsBySku', warehouseId, selectedItemSKU]
      : null
  const { data: items, mutate: mutateItems } = useSWR(
    itemsKey,
    () =>
      fetcher(
        async () => (await getAllItemsBySKU(warehouse, selectedItemSKU)).items
      ),
    { revalidateOnMount: true, revalidateOnFocus: true }
  )

  // Handlers
  const handleAccept = async (sku: string, name: string) => {
    if (!warehouseId) return
    createItem({
      sku,
      name,
      warehouseId: warehouseId,
    }).then((res) =>
      res.success ? toast.success(res.message) : toast.error(res.message)
    )
    await mutateDiffs()
  }

  const handleIgnore = async (sku: string) => {
    if (!warehouseId) return
    createIgnoreItem({
      sku,
      warehouseId: warehouseId,
    }).then((res) =>
      res.success ? toast.success(res.message) : toast.error(res.message)
    )
    await mutateDiffs()
  }

  const handleOpenDialog = async (sku: string) => {
    if (!warehouseId) return
    // warm SWR cache, then open
    await preload(['itemsBySku', warehouseId, sku], () =>
      fetcher(async () => (await getAllItemsBySKU(warehouse, sku)).items)
    )
    setSelectedItemSKU(sku)
    setIsDialogOpen(true)
  }

  const handleDeleteItem = async (id: string) => {
    deleteItem(id).then((res) =>
      res.success ? toast.success(res.message) : toast.error(res.message)
    )
    setIsDialogOpen(false)
    await Promise.all([mutateItems(), mutateDiffs()])
  }

  // Reset when dialog closes
  useEffect(() => {
    if (!isDialogOpen) setSelectedItemSKU('')
  }, [isDialogOpen])

  if (!warehouseId) {
    return (
      <div className='text-sm text-muted-foreground p-4'>
        No warehouse selected.
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 text-xs'>
      {diffs?.map((item) => (
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
                onMouseEnter={() =>
                  !warehouseId &&
                  preload(['itemsBySku', !warehouseId, item.sku], () =>
                    fetcher(
                      async () =>
                        (await getAllItemsBySKU(warehouse, item.sku)).items
                    )
                  )
                }
                onClick={() => handleOpenDialog(item.sku)}
              >
                Списать со склада
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>{selectedItemSKU || '—'}</DialogTitle>
              <DialogDescription>{selectedItemSKU}</DialogDescription>
            </DialogHeader>

            <div className='grid grid-cols-3 gap-1 text-xs'>
              {items?.map((it: IItem) => (
                <Card
                  className='cursor-pointer'
                  key={String(it._id)}
                  onClick={() => handleDeleteItem(String(it._id))}
                >
                  <CardHeader>
                    <CardTitle className='text-center'>{it.sku}</CardTitle>
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
      )}
    </div>
  )
}
