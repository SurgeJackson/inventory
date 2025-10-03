'use client'
import ItemsList from './items-list'
import CategoriesGroup from './categories-toggle-group'
import { useState } from 'react'

export default function Items() {
  const [value, setValue] = useState('all')

  return (
    <div className='w-full grid grid-cols-1 gap-2 px-4'>
      <CategoriesGroup showAll={true} handleValueChange={setValue} />
      <ItemsList category={value} />
    </div>
  )
}
