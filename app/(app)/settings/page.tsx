'use client'
import { useSession } from 'next-auth/react'
import useSWR, { preload } from 'swr'
import { toast } from 'sonner'
import {
  compareItems,
  createIgnoreItem,
  createItem,
  deleteItem,
  getAllItemsBySKU,
} from '@/lib/actions/item.actions'
import { fetcher, type IWarehouse } from '@/models/interfaces'
import { useEffect, useState } from 'react'
import ItemCard from './item-card'
import RemoveDialog from './remove-dialog'

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
    await Promise.all([mutateItems(), mutateDiffs()])
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
        <ItemCard
          key={`${item.sku}-${item.qty}`}
          item={item}
          handleAccept={handleAccept}
          handleIgnore={handleIgnore}
          handleOpenDialog={handleOpenDialog}
          handleMouseEnter={() =>
            !warehouseId &&
            preload(['itemsBySku', !warehouseId, item.sku], () =>
              fetcher(
                async () => (await getAllItemsBySKU(warehouse, item.sku)).items
              )
            )
          }
        />
      ))}
      {isDialogOpen && (
        <RemoveDialog
          items={items}
          selectedItemSKU={selectedItemSKU}
          handleDeleteItem={handleDeleteItem}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </div>
  )
}
