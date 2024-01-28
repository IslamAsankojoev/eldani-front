'use client'

import { HTMLProps, useEffect, useState } from 'react'

import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

import { Card } from '@/shadcn/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shadcn/ui/carousel'
import { type CarouselApi } from '@/shadcn/ui/carousel'

import { cn } from '@/src/shared/libs/utils'

type CarouselDemoProps = {
  thumbnails: Media[]
  className?: string
  prevButtonClassName?: string
  nextButtonClassName?: string
  dotsClassName?: string
}

export const PatternCardCarousel = ({
  thumbnails,
  className,
  nextButtonClassName = 'hidden',
  prevButtonClassName = 'hidden',
  dotsClassName,
}: CarouselDemoProps) => {
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
    <Carousel
      className="w-full rounded-lg"
      setApi={setApi}
      ref={ref}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {thumbnails?.map((image) => (
          <CarouselItem key={image.id}>
            <Card
              className={cn(
                'relative h-[60vw] overflow-hidden bg-transparent md:h-[40vh]',
                className,
              )}
            >
              <Image
                src={process.env.API_URL + image.url}
                sizes="100vw"
                fill
                priority
                alt={`Pattern ${image?.formats?.small?.url}`}
                className="object-cover"
              />
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div
        className={cn(
          'absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-2',
          dotsClassName,
        )}
      >
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
      <CarouselPrevious variant="outline" className={cn(prevButtonClassName)} />
      <CarouselNext variant="outline" className={nextButtonClassName} />
    </Carousel>
  )
}
