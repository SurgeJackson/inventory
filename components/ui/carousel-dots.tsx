'use client'
import * as React from 'react'
import type { CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function CarouselDots({
  api,
  className,
}: {
  api: CarouselApi | null
  className?: string
}) {
  const [count, setCount] = useState(0)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => setSelected(api.selectedScrollSnap())

    setCount(api.scrollSnapList().length)
    onSelect()
    api.on('select', onSelect)

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  if (!api || count <= 1) return null

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 bottom-2 flex items-center justify-center gap-2',
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => api.scrollTo(i)}
          className={cn(
            'pointer-events-auto h-2 w-2 rounded-full transition',
            i === selected
              ? 'bg-foreground'
              : 'bg-foreground/30 hover:bg-foreground/60'
          )}
          aria-label={`Слайд ${i + 1}`}
        />
      ))}
    </div>
  )
}
