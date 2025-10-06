'use client'
import ItemsList from './items-list'
import CategoriesGroup from './categories-toggle-group'
import { useState } from 'react'
import ZonesGroup from './zones-toggle-group'

export default function Items() {
  const [category, setCategory] = useState('all')
  const [zone, setZone] = useState('all')

  return (
    <div className='w-full grid grid-cols-1 gap-1 px-4'>
      <CategoriesGroup
        showAll={true}
        handleValueChange={setCategory}
        defaultValue={''}
      />
      <ZonesGroup
        showAll={true}
        handleValueChange={setZone}
        defaultValue={''}
      />
      <ItemsList category={category} zone={zone} />
    </div>
  )
}
