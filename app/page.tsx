'use client'
import image1 from '/public/images/pant1.jpg'
import image2 from '/public/images/pant2.jpg'
import image3 from '/public/images/pant3.jpg'
import image4 from '/public/images/kardigan1.jpg'
import image5 from '/public/images/kardigan2.jpg'
import image6 from '/public/images/kardigan3.jpg'
import image7 from '/public/images/hoodie1.jpg'
import image8 from '/public/images/hoodie2.jpg'
import image9 from '/public/images/hoodie3.jpg'

import PatternCard from '@/components/Pattern/PatternCard'
import { cn } from '@/lib/utils'
import _ from 'lodash'
import { signal } from '@preact/signals'
import { useEffect } from 'react'

const patterns = _.shuffle([
  {
    id: '1',
    name: 'Джинсовые штаны',
    description: 'летние',
    images: [image1, image2, image3],
    price: 1000,
  },
  {
    id: '2',
    name: 'Джинсовые штаны',
    description: 'летние',
    images: [image2, image3, image1],
    price: 1100,
  },
  {
    id: '3',
    name: 'Джинсовые штаны',
    description: 'летние',
    images: [image3, image1, image2],
    price: 1200,
  },
  {
    id: '4',
    name: 'Легкий Кардиган',
    description: 'летний',
    images: [image4, image5, image6],
    price: 2100,
  },
  {
    id: '5',
    name: 'Легкий Кардиган',
    description: 'летний',
    images: [image5, image6, image4],
    price: 2200,
  },
  {
    id: '6',
    name: 'Легкий Кардиган',
    description: 'летний',
    images: [image6, image4, image5],
    price: 2300,
  },
  {
    id: '7',
    name: 'Худи оверсайз',
    description: 'летний',
    images: [image7, image8, image9],
    price: 3100,
  },
  {
    id: '8',
    name: 'Худи оверсайз',
    description: 'летний',
    images: [image8, image9, image7],
    price: 3200,
  },
  {
    id: '9',
    name: 'Худи оверсайз',
    description: 'летний',
    images: [image9, image7, image8],
    price: 3300,
  },
])

export const clickedElement = signal<MouseEvent | null>(null)

export default function Home() {
  useEffect(() => {
    document.addEventListener('click', (e) => {
      clickedElement.value = e as MouseEvent
    })
  }, [])

  return (
    <section>
      <h1 className={cn('text-center text-2xl font-extrabold mt-4')}>Eldani patterns collection</h1>
      <div className="grid mt-4 gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 masonry">
        {patterns.map((pattern) => (
          <PatternCard
            key={pattern.id}
            id={pattern.id}
            name={pattern.name}
            description={pattern.description}
            images={pattern.images}
            price={pattern.price}
          />
        ))}
      </div>
    </section>
  )
}
