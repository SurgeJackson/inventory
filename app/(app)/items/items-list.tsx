'use client'
import { useMemo, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { toast } from 'sonner'

import type { IItem, IWarehouse } from '@/models/interfaces'
import { Item } from '@/models/models'
import ItemDialog from './item-dialog'
import ItemCard from './item-card'

import {
  getAllItems,
  updateItemCategory,
  updateItemCode,
  updateItemZone,
} from '@/lib/actions/item.actions'
import ItemsListFilter from './items-list-filter'

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export default function ItemsList({
  category,
  zone,
}: {
  category: string
  zone: string
}) {
  const { data: session } = useSession()
  const warehouse = session?.user?.warehouse as IWarehouse | undefined
  const warehouseId = warehouse?._id?.toString()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<IItem>({} as IItem)

  const [filter, setFilter] = useState('')
  const [filterCode, setFilterCode] = useState('')
  const [noCodeFilter, setNoCodeFilter] = useState(false)

  const key = warehouseId ? `getAllItems(${warehouseId})` : null
  const { data: itemData, mutate } = useSWR(
    key,
    async () => await getAllItems(warehouse as IWarehouse),
    { revalidateOnMount: false, revalidateOnFocus: false }
  )

  // Фильтрация
  const filtered = useMemo(() => {
    const items = itemData?.items ?? []

    const text = filter.trim().toLowerCase()
    const codeText = filterCode.trim().toLowerCase()
    const byCategory = (it: IItem) =>
      category === 'all'
        ? true
        : category === 'blank'
        ? !it?.category
        : it.category?._id?.toString() === category

    const byZone = (it: IItem) =>
      zone === 'all'
        ? true
        : zone === 'blank'
        ? !it?.zone
        : it.zone?._id?.toString() === zone

    const byText = (it: IItem) =>
      !text ||
      (!codeText &&
        `${it.sku ?? ''} ${it.name ?? ''}`.toLowerCase().includes(text))

    const byCode = (it: IItem) =>
      !codeText || `${it.code ?? ''}`.toLowerCase().includes(codeText)

    const byNoCode = (it: IItem) => !noCodeFilter || !(it.code ?? '').trim()

    return items.filter(
      (it: IItem) =>
        byCategory(it) && byZone(it) && byText(it) && byCode(it) && byNoCode(it)
    )
  }, [itemData?.items, category, zone, filter, filterCode, noCodeFilter])

  // Handlers
  const handleQRApply = useCallback(
    async (code: string) => {
      if (!UUID_RE.test(code)) {
        toast.error('Некорректный QR-код')
        return
      }
      const res = await updateItemCode(
        selectedItem as unknown as { _id: string },
        code
      )
      if (!res.success) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
      }
      setIsDialogOpen(false)
      mutate()
    },
    [mutate, selectedItem]
  )

  const handleQRDelete = useCallback(async () => {
    const res = await updateItemCode(
      selectedItem as unknown as { _id: string },
      ''
    )
    if (!res.success) {
      toast.error(res.message)
    } else {
      toast.success(res.message)
    }
    setIsDialogOpen(false)
    mutate()
  }, [mutate, selectedItem])

  const handleEnterInInput = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return
      e.preventDefault()
      await handleQRApply((e.target as HTMLInputElement).value)
    },
    [handleQRApply]
  )

  const handleFilterEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return
      e.preventDefault()
      if (!UUID_RE.test(filter)) {
        setFilterCode('')
        toast.error('Некорректный QR-код')
        return
      }
      setFilterCode(filter)
      setFilter('')
    },
    [filter]
  )

  const handleCategoryChange = useCallback(
    async (catId: string) => {
      const res = await updateItemCategory(
        selectedItem as unknown as { sku: string; warehouse: string },
        catId
      )
      if (!res.success) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
      }
      setIsDialogOpen(false)
      mutate()
    },
    [mutate, selectedItem]
  )

  const handleZoneChange = useCallback(
    async (zoneId: string) => {
      const res = await updateItemZone(
        selectedItem as unknown as { _id: string },
        zoneId
      )
      if (!res.success) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
      }
      setIsDialogOpen(false)
      mutate()
    },
    [mutate, selectedItem]
  )

  if (!warehouseId) {
    return (
      <div className='p-4 text-sm text-muted-foreground'>Склад не выбран.</div>
    )
  }

  return (
    <div className='flex flex-col gap-2'>
      <ItemsListFilter
        filter={filter}
        filterCode={filterCode}
        noCodeFilter={noCodeFilter}
        setFilter={setFilter}
        setFilterCode={setFilterCode}
        setNoCodeFilter={setNoCodeFilter}
        handleFilterEnter={handleFilterEnter}
      />
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 text-xs'>
        {filtered?.map((item: IItem) => {
          const key = String(item._id ?? item.sku)
          return (
            <ItemCard
              item={item}
              key={key}
              setSelectedItem={setSelectedItem}
              setIsDialogOpen={setIsDialogOpen}
            />
          )
        })}
      </div>
      {isDialogOpen && (
        <ItemDialog
          selectedItem={selectedItem}
          handleQRDelete={handleQRDelete}
          handleEnterInInput={handleEnterInInput}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          mutate={mutate}
          handleCategoryChange={handleCategoryChange}
          handleZoneChange={handleZoneChange}
        />
      )}
    </div>
  )
}
