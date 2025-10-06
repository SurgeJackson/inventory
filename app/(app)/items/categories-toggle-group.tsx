'use client'
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { getAllCategories } from '@/lib/actions/category.actions'
import { ICategory } from '@/models/interfaces'
import { Collapsible } from '@radix-ui/react-collapsible'
import { ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import useSWR from 'swr'

export default function CategoriesGroup({
  showAll,
  handleValueChange,
  defaultValue,
}: {
  showAll: boolean
  handleValueChange: (value: string) => void
  defaultValue: string
}) {
  const [value, setValue] = useState(
    showAll ? 'all' : defaultValue ? defaultValue : ''
  )

  const { data: categories } = useSWR('getAllCategories', {
    fetcher: async () => {
      const res = await getAllCategories()
      return res.categories
    },
    revalidateOnMount: false,
    revalidateOnFocus: false,
  })

  return (
    <Collapsible className='w-full border rounded-md p-1'>
      <CollapsibleTrigger className='flex items-center gap-2 p-2 cursor-pointer w-full'>
        <p className='text-xs w-full'>Категория</p>
        <ChevronsUpDown className='h-4 w-4' />
      </CollapsibleTrigger>
      <CollapsibleContent>
        {categories?.length > 0 && (
          <ToggleGroup
            className='w-full flex flex-wrap gap-0.5 text-xs'
            type='single'
            value={value}
            onValueChange={(newValue) => {
              if (newValue) {
                setValue(newValue)
                handleValueChange(newValue)
              } else handleValueChange(value)
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
                <p>Без категории</p>
              </ToggleGroupItem>
            )}
            {categories?.map((category: ICategory) => (
              <ToggleGroupItem
                key={category._id.toString()}
                value={category._id.toString()}
                className='min-w-[100px] border p-1 rounded-md text-xs'
              >
                <p className='truncate'>{category.name}</p>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
