'use client'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { CarouselDots } from '@/components/ui/carousel-dots'
import { IItem } from '@/models/interfaces'
import Image from 'next/image'
import { useState } from 'react'

export default function ItemImage({ item }: { item: IItem }) {
  const [api, setApi] = useState<CarouselApi | null>(null)

  const key = String(item._id ?? item.sku)
  const slides = [
    item?.image ? `https://sturmproject.ru/image/${item.image}` : null,
    item?.userImage ? `/api/images/${item.userImage}` : null,
  ].filter(Boolean) as string[]
  return (
    <div>
      {slides.length > 1 ? (
        <Carousel className='relative aspect-square' setApi={setApi}>
          <CarouselContent>
            {slides.map((src, i) => (
              <CarouselItem key={`${key}-${i}`}>
                <div className='relative aspect-square'>
                  <Image
                    src={src}
                    alt={item.name}
                    sizes='(max-width:768px)100vw,(max-width:1200px)50vw,33vw'
                    fill
                    loading='lazy'
                    className='rounded-xl object-cover'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots api={api} />
        </Carousel>
      ) : (
        <div className='relative aspect-square'>
          {slides[0] && (
            <Image
              src={slides[0]}
              alt={item.name}
              sizes='(max-width:768px)100vw,(max-width:1200px)50vw,33vw'
              fill
              loading='lazy'
              className='rounded-xl object-cover'
            />
          )}
        </div>
      )}
    </div>
  )
}
