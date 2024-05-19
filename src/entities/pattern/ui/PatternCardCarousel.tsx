'use client'

import { useEffect, useState } from 'react'

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
import { Skeleton } from '@/shadcn/ui/skeleton'

import { imageLoader } from '@/src/shared/libs/imageLoader'
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
  const [imageLoading, setImageLoading] = useState(true)
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
      className="h-full w-full rounded-lg"
      setApi={setApi}
      ref={ref}
      opts={{ loop: true }}
    >
      <CarouselContent className="h-full">
        {thumbnails?.map((image, idx) => (
          <CarouselItem key={image.id} className="h-full">
            <Card
              className={cn(
                'relative h-full overflow-hidden border-0 bg-transparent shadow-sm md:h-full',
                className,
              )}
            >
              <Image
                src={image.formats.medium.url}
                onLoad={() => {
                  if (idx === 0) {
                    setImageLoading(false)
                  }
                }}
                loader={imageLoader}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                alt={`Pattern ${image?.name}`}
                className="object-cover"
              />
              {imageLoading && <Skeleton className="h-full w-full" />}
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div
        className={cn(
          'absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2',
          dotsClassName,
        )}
      >
        {thumbnails?.map((image, index) => (
          <div
            key={image.id}
            onClick={() => api?.scrollTo(index)}
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
