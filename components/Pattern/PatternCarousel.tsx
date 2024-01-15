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

type CarouselDemoProps = {
  thumbnails: Media[]
}

const CarouselDemo = ({ thumbnails }: CarouselDemoProps) => {
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
            <div className="w-[300px] h-[auto] min-h-[300px] relative">
              <Image
                src={process.env.API_URL + image.url}
                sizes="100vw"
                fill
                priority
                alt={`Pattern ${image}`}
                className="object-cover rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-2 left-1/2 z-10 flex gap-2 -translate-x-1/2">
        {thumbnails?.map((image, index) => (
          <div
            key={image.id}
            className={cn('w-1 h-1 bg-white/55 rounded-full', active === index + 1 && 'bg-white')}
          />
        ))}
      </div>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default CarouselDemo
