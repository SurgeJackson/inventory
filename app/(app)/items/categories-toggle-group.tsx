'use client'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { getAllCategories } from '@/lib/actions/category.actions'
import { ICategory } from '@/models/interfaces'
import { useState } from 'react'
import useSWR from 'swr'

export default function CategoriesGroup({
  showAll,
  handleValueChange,
}: {
  showAll: boolean
  handleValueChange: (value: string) => void
}) {
  const [value, setValue] = useState(showAll ? 'all' : '')

  const { data: categories } = useSWR('getAllCategories', {
    fetcher: async () => {
      const res = await getAllCategories()
      return res.categories
    },
    revalidateOnMount: false,
    revalidateOnFocus: false,
  })

  return (
    categories?.length > 0 && (
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
            className='min-w-[100px] border p-2 rounded-md text-xs'
          >
            <p>Все товары</p>
          </ToggleGroupItem>
        )}
        {showAll && (
          <ToggleGroupItem
            value='blank'
            className='min-w-[100px] border p-2 rounded-md text-xs'
          >
            <p>Без категории</p>
          </ToggleGroupItem>
        )}
        {categories?.map((category: ICategory) => (
          <ToggleGroupItem
            key={category._id.toString()}
            value={category._id.toString()}
            className='min-w-[100px] border p-2 rounded-md text-xs'
          >
            <p className='truncate'>{category.name}</p>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    )
  )
}
