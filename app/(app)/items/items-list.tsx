'use client'
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
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { CircleCheckBig, CircleX, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  getAllItemsWithImages,
  updateItemCategory,
  updateItemCode,
  updateItemZone,
} from '@/lib/actions/item.actions'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ICategory, IItem, IZone } from '@/models/interfaces'
import CategoriesGroup from './categories-toggle-group'
import { Item } from '@/models/models'
import Image from 'next/image'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import React from 'react'
import ZonesGroup from './zones-toggle-group'
import { Button } from '@/components/ui/button'

export default function ItemsList({
  category,
  zone,
}: {
  category: string
  zone: string
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<IItem>(new Item())
  const [code, setCode] = useState('')
  const [filter, setFilter] = useState('')
  const [noCodeFilter, setNoCodeFilter] = useState(false)
  const warehouse = useSession().data?.user?.warehouse
  const [filterCode, setFilterCode] = useState('')

  const { data: itemData, mutate } = useSWR(
    `getAllItemsWithImages(${warehouse._id})`,
    {
      fetcher: async () => {
        const res = await getAllItemsWithImages(warehouse)
        return res
      },
      revalidateOnMount: false,
      revalidateOnFocus: false,
    }
  )

  useEffect(() => {
    mutate()
  })

  const filtered = useMemo(
    () =>
      (itemData?.items ?? []).filter(
        (it: IItem) =>
          // category filter
          (category === 'all' ||
            (category === 'blank'
              ? !it?.category
              : it.category?._id?.toString() === category)) &&
          // zone filter
          (zone === 'all' ||
            (zone === 'blank'
              ? !it?.zone
              : it.zone?._id?.toString() === zone)) &&
          // text filter
          (!filter.trim() ||
            (!filterCode.trim() &&
              `${it.sku ?? ''} ${it.name ?? ''}`
                .toLowerCase()
                .includes(filter.trim().toLowerCase()))) &&
          // code filter
          (!filterCode.trim() ||
            `${it.code ?? ''}`
              .toLowerCase()
              .includes(filterCode.trim().toLowerCase())) &&
          // no-code filter
          (!noCodeFilter || !(it.code ?? '').trim())
      ),
    [itemData?.items, category, zone, filter, noCodeFilter, filterCode]
  )

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

      if (!uuidRegex.test(code)) {
        setCode('')
        toast.error('Некорректный QR-код')
        return
      }
      const data = await updateItemCode(selectedItem, code)

      if (!data.success) {
        toast.error(data.message)
      } else {
        toast.success(data.message)
      }

      setSelectedItem(data.data)
      setIsDialogOpen(false)
      setCode('')
    }
  }

  const handleFilterKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

      if (!uuidRegex.test(filter)) {
        setFilterCode('')
        toast.error('Некорректный QR-код')
        return
      }
      setFilterCode(filter)
      setFilter('')
    }
  }

  const handleCheckedChange = (checked: boolean) => {
    setNoCodeFilter(checked)
  }

  const handleCategoryChange = async (category: string) => {
    const data = await updateItemCategory(selectedItem, category)
    if (!data.success) {
      toast.error(data.message)
    } else {
      toast.success(data.message)
    }
    setSelectedItem(data.data)
    setIsDialogOpen(false)
  }

  const handleZoneChange = async (zone: string) => {
    const data = await updateItemZone(selectedItem, zone)
    if (!data.success) {
      toast.error(data.message)
    } else {
      toast.success(data.message)
    }
    setSelectedItem(data.data)
    setIsDialogOpen(false)
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-2'>
        <div className='flex items-center gap-1 w-full'>
          <Search className='w-5 h-5' strokeWidth={1} />
          <Input
            id='search'
            value={filter}
            onKeyDown={handleFilterKeyDown}
            onChange={(e) => {
              setFilterCode('')
              setFilter(e.target.value)
            }}
          />
          {(filter || filterCode) && (
            <Button
              size='sm'
              variant='outline'
              onClick={() => {
                setFilter('')
                setFilterCode('')
              }}
            >
              <X className='w-5 h-5' strokeWidth={1} />
            </Button>
          )}
        </div>
        <div className='flex items-center gap-1'>
          <Switch
            id='no-qr'
            checked={noCodeFilter}
            onCheckedChange={handleCheckedChange}
          />
          <Label className='text-nowrap text-xs' htmlFor='no-qr'>
            Без QR
          </Label>
        </div>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 text-xs'>
        {filtered?.map((item: IItem, index: number) => {
          return (
            <Card
              key={index}
              className='cursor-pointer gap-2 p-2'
              onClick={() => {
                setSelectedItem(item)
                setIsDialogOpen(true)
              }}
            >
              <CardHeader className='p-0'>
                <div className='relative aspect-square'>
                  {item?.image && (
                    <Image
                      src={'https://sturmproject.ru/image/' + item?.image}
                      alt={item.name}
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      fill={true}
                      loading='lazy'
                      className='rounded-xl'
                    />
                  )}
                </div>
                <CardTitle className='text-center'>{item.sku}</CardTitle>
                <CardDescription className='text-center'>
                  <p>{item.name}</p>
                </CardDescription>
              </CardHeader>
              <CardContent className='flex flex-col text-center items-center justify-center p-0 text-[6px]'>
                {item.code && (
                  <CircleCheckBig
                    className='w-8 h-8 text-green-600'
                    strokeWidth={2}
                  />
                )}
                {!item.code && (
                  <CircleX className='w-8 h-8 text-red-700' strokeWidth={2} />
                )}
              </CardContent>
              <CardFooter className='flex flex-col text-center items-center justify-center p-0 text-[8px]'>
                <p>{item.code}</p>
                <p>{(item.category as ICategory)?.name}</p>
                <p>{(item.zone as IZone)?.name}</p>
              </CardFooter>
            </Card>
          )
        })}
      </div>
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>{selectedItem?.sku}</DialogTitle>
              <DialogDescription>{selectedItem?.name}</DialogDescription>
            </DialogHeader>
            <div className='flex items-center gap-2'>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <DialogFooter>
              <div className='flex flex-col items-center gap-2'>
                <CategoriesGroup
                  showAll={false}
                  handleValueChange={handleCategoryChange}
                />
                <ZonesGroup
                  showAll={false}
                  handleValueChange={handleZoneChange}
                />
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
