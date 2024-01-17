'use client'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shadcn/ui/carousel'
import { useEffect, useState } from 'react'
import { type CarouselApi } from '@/shadcn/ui/carousel'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'
import { Card } from '@/shadcn/ui/card'

type CarouselDemoProps = {
  thumbnails: Media[]
}

const PatternCardCarousel = ({ thumbnails }: CarouselDemoProps) => {
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
    <Carousel className="w-full max-w-xs" setApi={setApi} ref={ref}>
      <CarouselContent>
        {thumbnails?.map((image) => (
          <CarouselItem key={image.id}>
            <Card className="h-[60vw] md:h-[40vh] relative overflow-hidden">
              <Image
                src={process.env.API_URL + image.url}
                sizes="100vw"
                fill
                priority
                alt={`Pattern ${image.name}`}
                className="object-cover rounded-lg"
              />
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-2 left-1/2 z-10 flex gap-2 -translate-x-1/2">
        {thumbnails?.map((image, index) => (
          <div
            onClick={() => api?.scrollTo(index)}
            key={image.id}
            className={cn(
              'w-1 h-1 bg-white/55 rounded-full cursor-pointer hover:scale-125 transition',
              active === index + 1 && 'bg-white scale-125',
            )}
          />
        ))}
      </div>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default PatternCardCarousel
