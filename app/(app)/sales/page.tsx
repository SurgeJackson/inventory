/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import {
  createBuhSale,
  get1CSales,
  // getTorgMaxItemCode,
  // syncGoods,
} from '@/lib/actions/1c.actions'
import { DataTable } from '../../../components/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  ArrowLeftRight,
  ChevronDownIcon,
  OctagonX,
  SquareCheckBig,
} from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { ru } from 'react-day-picker/locale'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { getAllSaleLogs } from '@/lib/actions/saleLog.action'
// import { getMaxItemCode } from '@/lib/actions/maxitemcode.action'
import { useSetCookie, useGetCookie } from 'cookies-next'

export default function SalesPage() {
  const [data, setData] = useState([])
  // const [maxItemTorgCode, setMaxItemTorgCode] = useState(0)
  // const [maxItemCode, setMaxItemCode] = useState(0)

  const setCookie = useSetCookie()
  const getCookie = useGetCookie()

  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [startOpen, setStartOpen] = useState(false)
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [endOpen, setEndOpen] = useState(false)

  async function handleMove(sale: any) {
    createBuhSale(sale).then((res) =>
      res.success ? toast.success(res.message) : toast.error(res.message)
    )
  }

  useEffect(() => {
    const startDateCookie = getCookie('startDate')
    const endDateCookie = getCookie('endDate')
    if (startDateCookie) setStartDate(new Date(startDateCookie))
    if (endDateCookie) setEndDate(new Date(endDateCookie))
  }, [getCookie])

  useEffect(() => {
    const fetchData = async () => {
      const result = await get1CSales(
        format(startDate!, 'yyyy-MM-dd'),
        format(endDate!, 'yyyy-MM-dd')
      )

      const saleLogs = await getAllSaleLogs()
      const data: any = []

      result.forEach((item: any) => {
        data.push({
          ...item,
          loaded: saleLogs.saleLogs.find(
            (log: { saleKey: any }) => log.saleKey === item.Ref_Key
          )
            ? true
            : false,
        })
      })
      setData(data)

      // const maxItemTorgCode = await getTorgMaxItemCode()
      // const maxItemCode = await getMaxItemCode()

      // setMaxItemTorgCode(maxItemTorgCode)
      // setMaxItemCode(maxItemCode.maxItemCode.maxItemCode)
    }
    fetchData()
  }, [startDate, endDate])

  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: 'Posted',
      header: () => <p className='w-4 text-wrap text-xs text-center'></p>,
      cell: ({ row }) => {
        const rowData = row.original
        return rowData.Posted ? (
          <SquareCheckBig className='w-4 h-4 text-green-600 text-center' />
        ) : rowData.DeletionMark ? (
          <OctagonX className='w-4 h-4 text-red-600' />
        ) : (
          ''
        )
      },
    },
    {
      accessorKey: 'Number',
      header: () => (
        <p className='w-[80px] text-wrap text-xs text-center'>Номер</p>
      ),
      cell: ({ row }) => {
        const rowData = row.original
        return (
          <p className='w-[80px] text-wrap text-xs text-center'>
            {rowData.Number}
          </p>
        )
      },
    },
    {
      accessorKey: 'Date',
      header: () => (
        <p className='w-[60px] text-wrap text-xs text-center'>Дата</p>
      ),
      cell: ({ row }) => {
        const rowData = row.original
        return (
          <p className='w-[60px] text-wrap text-xs text-center'>
            {format(rowData.Date, 'dd.MM.yyyy HH:mm:ss')}
          </p>
        )
      },
    },
    {
      accessorKey: 'Организация.Description',
      header: () => (
        <p className='w-[80px] text-wrap text-xs text-center'>Организация</p>
      ),
      cell: ({ row }) => {
        const rowData = row.original
        return (
          <p className='w-[80px] text-wrap text-xs text-center'>
            {rowData.Организация.Description}
          </p>
        )
      },
    },
    {
      accessorKey: 'Партнер.Description',
      header: () => (
        <p className='w-full text-wrap text-xs text-center'>Партнер</p>
      ),
      cell: ({ row }) => {
        const rowData = row.original
        return (
          <p className='w-full text-wrap text-xs text-center'>
            {rowData.Партнер.Description}
          </p>
        )
      },
    },
    {
      accessorKey: 'Контрагент.Description',
      header: () => (
        <p className='w-full text-wrap text-xs text-center'>Контрагент ИНН</p>
      ),
      cell: ({ row }) => {
        const rowData = row.original
        return (
          <div className='flex flex-col w-full text-wrap text-xs text-center'>
            <p>{rowData.Контрагент.Description}</p>
            <p>{rowData.Контрагент.ИНН}</p>
          </div>
        )
      },
    },

    {
      accessorKey: 'Менеджер.Description',
      header: () => (
        <p className='w-[100px] text-wrap text-xs text-center'>
          Менеджер Подразделение
        </p>
      ),
      cell: ({ row }) => {
        const rowData = row.original
        return (
          <div className='flex flex-col w-[100px] text-wrap text-xs text-center'>
            <p>{rowData.Менеджер.Description}</p>
            <p>{rowData.Подразделение.Description}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'Склад.Description',
      header: () => (
        <p className='w-[80px] text-wrap text-xs text-center'>Склад</p>
      ),
      cell: ({ row }) => {
        const rowData = row.original
        return (
          <p className='w-[80px] text-wrap text-xs text-center'>
            {rowData.Склад.Description}
          </p>
        )
      },
    },
    {
      accessorKey: 'СуммаДокумента',
      header: () => (
        <p className='w-[80px] text-wrap text-xs text-center'>
          Сумма документа
        </p>
      ),
      cell: ({ row }) => {
        const rowData = row.original
        return (
          <p className='w-[80px] text-wrap text-xs text-right'>
            {rowData.СуммаДокумента.toLocaleString('ru-RU', {
              minimumFractionDigits: 2,
            })}
          </p>
        )
      },
    },
    {
      accessorKey: 'Статус',
      header: () => (
        <p className='w-[60px] text-wrap text-xs text-center'>
          Статус Доставка
        </p>
      ),
      cell: ({ row }) => {
        const rowData = row.original
        return (
          <div className='flex flex-col w-[60px] text-wrap text-xs text-center'>
            <p>{rowData.Статус}</p>
            <p>{rowData.СпособДоставки}</p>
          </div>
        )
      },
    },
    {
      accessorKey: 'Create',
      header: () => (
        <p className='w-[100px] text-wrap text-xs text-center'>Перенести</p>
      ),
      cell: ({ row }) => {
        const rowData = row.original
        return (
          <div className='flex items-center justify-center'>
            <Button
              className='w-[50px] cursor-pointer text-xs text-center'
              variant='outline'
              onClick={() => handleMove(rowData)}
            >
              <ArrowLeftRight
                className={cn('h-4 w-4', rowData.loaded && 'text-red-600')}
              />
            </Button>
          </div>
        )
      },
    },
  ]
  return (
    <div className='px-2'>
      <h1 className='text-center text-2xl font-semibold p-2'>
        Перенос реализаций в бухгалтерию
      </h1>
      {/* <div>
        <p>{maxItemTorgCode}</p>
        <p>{maxItemCode}</p>
        <Button
          variant='outline'
          onClick={async () => {
            await syncGoods()
          }}
        >
          SyncGoods
        </Button>
      </div> */}
      <div className='flex gap-2 p-2'>
        <Label>Период</Label>
        <Popover open={startOpen} onOpenChange={setStartOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              id='date'
              className='w-32 justify-between font-normal'
            >
              {startDate ? startDate.toLocaleDateString() : 'Начало периода'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
            <Calendar
              ISOWeek
              locale={ru}
              mode='single'
              selected={startDate}
              captionLayout='dropdown'
              onSelect={(startDate) => {
                setStartDate(startDate)
                setStartOpen(false)
                setCookie('startDate', startDate?.toISOString(), {
                  maxAge: 60 * 60 * 24 * 7,
                })
              }}
            />
          </PopoverContent>
        </Popover>
        <Label>-</Label>
        <Popover open={endOpen} onOpenChange={setEndOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              id='date'
              className='w-32 justify-between font-normal'
            >
              {endDate ? endDate.toLocaleDateString() : 'Конец периода'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
            <Calendar
              ISOWeek
              locale={ru}
              mode='single'
              selected={endDate}
              captionLayout='dropdown'
              onSelect={(endDate) => {
                setEndDate(endDate)
                setEndOpen(false)
                setCookie('endDate', endDate?.toISOString(), {
                  maxAge: 60 * 60 * 24 * 7,
                })
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='px-2'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
