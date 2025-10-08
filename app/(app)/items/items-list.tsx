'use client'
import { useMemo, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import Image from 'next/image'
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { CircleCheckBig, CircleX, Search, X } from 'lucide-react'

import {
  getAllItemsWithImages,
  updateItemCategory,
  updateItemCode,
  updateItemZone,
} from '@/lib/actions/item.actions'
import CategoriesGroup from './categories-toggle-group'
import ZonesGroup from './zones-toggle-group'

import type { ICategory, IItem, IWarehouse, IZone } from '@/models/interfaces'
import { Item } from '@/models/models'

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

type Props = { category: string; zone: string }

export default function ItemsList({ category, zone }: Props) {
  const { data: session } = useSession()
  const warehouse = session?.user?.warehouse as IWarehouse | undefined
  const warehouseId = warehouse?._id?.toString()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<IItem>(new Item())

  const [filter, setFilter] = useState('')
  const [filterCode, setFilterCode] = useState('')
  const [noCodeFilter, setNoCodeFilter] = useState(false)

  const key = warehouseId ? `getAllItemsWithImages(${warehouseId})` : null
  const { data: itemData, mutate } = useSWR(
    key,
    async () => await getAllItemsWithImages(warehouse as IWarehouse),
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
      const res = await updateItemCode(selectedItem, code)
      if (!res.success) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
      }
      setSelectedItem(res.data)
      setIsDialogOpen(false)
      mutate()
    },
    [mutate, selectedItem]
  )

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
      const res = await updateItemCategory(selectedItem, catId)
      if (!res.success) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
      }
      setSelectedItem(res.data)
      setIsDialogOpen(false)
      mutate()
    },
    [mutate, selectedItem]
  )

  const handleZoneChange = useCallback(
    async (zoneId: string) => {
      const res = await updateItemZone(selectedItem, zoneId)
      if (!res.success) {
        toast.error(res.message)
      } else {
        toast.success(res.message)
      }
      setSelectedItem(res.data)
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
      {/* Панель фильтров */}
      <div className='flex gap-2'>
        <div className='flex items-center gap-1 w-full'>
          <Search className='w-5 h-5' strokeWidth={1} />
          <Input
            id='search'
            value={filter}
            onKeyDown={handleFilterEnter}
            onChange={(e) => {
              setFilterCode('')
              setFilter(e.target.value)
            }}
            placeholder='Поиск по артикулу / названию или вставьте QR'
          />
          {(filter || filterCode) && (
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                setFilter('')
                setFilterCode('')
              }}
              aria-label='Очистить фильтр'
            >
              <X className='w-5 h-5' strokeWidth={1} />
            </Button>
          )}
        </div>

        <div className='flex items-center gap-1'>
          <Switch
            id='no-qr'
            checked={noCodeFilter}
            onCheckedChange={setNoCodeFilter}
          />
          <Label className='text-nowrap text-xs' htmlFor='no-qr'>
            Без QR
          </Label>
        </div>
      </div>

      {/* Сетка карточек */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 text-xs'>
        {filtered?.map((item: IItem) => {
          const key = String(item._id ?? item.sku)
          const img = item?.image
            ? `https://sturmproject.ru/image/${item.image}`
            : null

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
                <div className='relative aspect-square'>
                  {img && (
                    <Image
                      src={img}
                      alt={item.name}
                      sizes='(max-width:768px)100vw,(max-width:1200px)50vw,33vw'
                      fill
                      loading='lazy'
                      className='rounded-xl object-cover'
                    />
                  )}
                </div>
                <CardTitle className='text-center'>{item.sku}</CardTitle>
                <CardDescription className='text-center'>
                  <p>{item.name}</p>
                </CardDescription>
              </CardHeader>

              <CardContent className='flex flex-col items-center justify-center p-0'>
                {item.code ? (
                  <CircleCheckBig
                    className='w-8 h-8 text-green-600'
                    strokeWidth={2}
                  />
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
        })}
      </div>

      {/* Диалог */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>{selectedItem?.sku}</DialogTitle>
            <DialogDescription>{selectedItem?.name}</DialogDescription>
          </DialogHeader>

          <div className='flex items-center gap-2'>
            <Input
              placeholder='Отсканируйте QR'
              onKeyDown={handleEnterInInput}
              defaultValue=''
            />
          </div>

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
    </div>
  )
}
