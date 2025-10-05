'use client'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { getAllZones } from '@/lib/actions/zone.action'
import { IZone } from '@/models/interfaces'
import { ChevronsUpDown } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import useSWR from 'swr'

export default function ZonesGroup({
  showAll,
  handleValueChange,
}: {
  showAll: boolean
  handleValueChange: (value: string) => void
}) {
  const [value, setValue] = useState(showAll ? 'all' : '')
  const warehouse = useSession().data?.user?.warehouse

  const { data: zones } = useSWR(`getAllZones(${warehouse._id})`, {
    fetcher: async () => {
      const res = await getAllZones(warehouse)
      return res.zones
    },
    revalidateOnMount: false,
    revalidateOnFocus: false,
  })

  return (
    <Collapsible>
      <CollapsibleTrigger className='flex items-center gap-2 p-2'>
        <p className='text-xs'>Зона хранения</p>
        <ChevronsUpDown className='h-4 w-4' />
      </CollapsibleTrigger>
      <CollapsibleContent>
        {zones?.length > 0 && (
          <ToggleGroup
            className='w-full flex flex-wrap gap-0.5 text-xs'
            type='single'
            value={value}
            onValueChange={(value) => {
              if (value) setValue(value)
              handleValueChange(value)
            }}
          >
            {showAll && (
              <ToggleGroupItem
                value='all'
                className='min-w-[100px] border p-1 rounded-md text-xs'
              >
                <p>Все товары</p>
              </ToggleGroupItem>
            )}
            {showAll && (
              <ToggleGroupItem
                value='blank'
                className='min-w-[100px] border p-1 rounded-md text-xs'
              >
                <p className='truncate'>Без зоны хранения</p>
              </ToggleGroupItem>
            )}
            {zones?.map((zone: IZone) => (
              <ToggleGroupItem
                key={zone._id.toString()}
                value={zone._id.toString()}
                className='min-w-[100px] border p-1 rounded-md text-xs'
              >
                <p className='truncate'>{zone.name}</p>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
