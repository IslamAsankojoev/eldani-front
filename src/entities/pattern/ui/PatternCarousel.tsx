'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'

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

  const [active, setActive] = useState(0)

  const handleClick = (index: number) => {
    api?.scrollTo(index)
  }

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
    <>
      <div className="flex w-full gap-4">
        <div className="hidden md:block md:w-1/5">
          <Carousel
            orientation="vertical"
            opts={{
              align: 'start',
            }}
            setApi={setApi}
          >
            <CarouselContent className="h-[72vh] flex">
              {thumbnails?.map((image, index) => (
                <CarouselItem
                  key={image.id}
                  className={cn('basis-1/4 cursor-pointer ')}
                  onClick={() => {
                    handleClick(index)
                  }}
                >
                  <Card
                    className={cn(
                      'relative h-full overflow-hidden rounded-none md:rounded-xl',
                    )}
                  >
                    <Image
                      src={process.env.API_URL + image.formats.small.url}
                      fill
                      priority
                      alt={`Pattern ${image.name}`}
                      className={cn(
                        'select-none object-cover',
                        active === image.id && 'border-1 border-rose-500',
                      )}
                    />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="" />
            <CarouselNext className="" />
          </Carousel>
        </div>
        <div className="w-full md:w-4/5">
          <Carousel
            className="w-full overflow-hidden rounded-none md:rounded-xl"
            setApi={setApi}
            opts={{
              loop: true,
              duration: 0,
            }}
          >
            <CarouselContent>
              {thumbnails?.map((image) => (
                <CarouselItem key={image.id}>
                  <Card className="relative h-[70vh] overflow-hidden rounded-none md:rounded-xl">
                    <Image
                      src={process.env.API_URL + image.url}
                      fill
                      priority
                      alt={`Pattern ${image.name}`}
                      className="select-none object-cover"
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
            <CarouselPrevious className="!-bottom-2 !left-2 !top-[initial] z-50 hidden md:flex" />
            <CarouselNext className="!-bottom-2 !right-2 !top-[initial] z-50 hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </>
  )
}
