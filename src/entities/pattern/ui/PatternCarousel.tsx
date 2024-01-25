'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

import { Card } from '@/shadcn/ui/card'
import { type CarouselApi } from '@/shadcn/ui/carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shadcn/ui/carousel'

import { cn } from '@/src/shared/libs/utils'

type CarouselDemoProps = {
  thumbnails: Media[]
}

export const PatternCarousel = ({ thumbnails }: CarouselDemoProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const { ref, inView, entry } = useInView({
    threshold: 0,
    trackVisibility: true,
    delay: 100,
  })
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!inView) {
      api?.scrollTo(0)
    }
  }, [inView, api])

  useEffect(() => {
    if (!api) {
      return
    }

    setActive(api.selectedScrollSnap() + 1)
    api.on('select', () => {
      setActive(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel className="w-full" setApi={setApi} ref={ref}>
      <CarouselContent>
        {thumbnails?.map((image) => (
          <CarouselItem key={image.id}>
            <Card className="relative h-[70vh]">
              <Image
                src={process.env.API_URL + image.url}
                fill
                priority
                alt={`Pattern ${image.name}`}
                className="object-cover"
              />
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {thumbnails?.map((image, index) => (
          <div
            onClick={() => api?.scrollTo(index)}
            key={image.id}
            className={cn(
              'h-1 w-1 cursor-pointer rounded-full bg-white/55 transition hover:scale-125',
              active === index + 1 && 'scale-125 bg-white',
            )}
          />
        ))}
      </div>
      <CarouselPrevious className="hidden md:visible" />
      <CarouselNext className="hidden md:visible" />
    </Carousel>
  )
}
