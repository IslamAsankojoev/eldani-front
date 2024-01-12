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

const CarouselDemo = ({ images }: { images: any[] }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    trackVisibility: true,
    delay: 100,
  })

  useEffect(() => {
    if (!inView) {
      api?.scrollTo(0)
    }
  }, [inView])

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel className="w-full max-w-xs" setApi={setApi} ref={ref}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="w-[300px] h-[300px] relative">
              <Image
                src={image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                priority
                alt={`Pattern ${image}`}
                className="object-cover rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default CarouselDemo
