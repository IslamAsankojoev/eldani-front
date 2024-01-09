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
import { Lemon } from 'next/font/google'
import _ from 'lodash'

const patterns = _.shuffle([
  {
    id: '1',
    name: 'Джинсовые штаны',
    description: 'летние',
    image: image1,
    price: 1000,
  },
  {
    id: '2',
    name: 'Джинсовые штаны',
    description: 'летние',
    image: image2,
    price: 1100,
  },
  {
    id: '3',
    name: 'Джинсовые штаны',
    description: 'летние',
    image: image3,
    price: 1200,
  },
  {
    id: '4',
    name: 'Легкий Кардиган',
    description: 'летний',
    image: image4,
    price: 2100,
  },
  {
    id: '5',
    name: 'Легкий Кардиган',
    description: 'летний',
    image: image5,
    price: 2200,
  },
  {
    id: '6',
    name: 'Легкий Кардиган',
    description: 'летний',
    image: image6,
    price: 2300,
  },
  {
    id: '7',
    name: 'Худи оверсайз',
    description: 'летний',
    image: image7,
    price: 3100,
  },
  {
    id: '8',
    name: 'Худи оверсайз',
    description: 'летний',
    image: image8,
    price: 3200,
  },
  {
    id: '9',
    name: 'Худи оверсайз',
    description: 'летний',
    image: image9,
    price: 3300,
  },
])

const lemon = Lemon({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
})

export default function Home() {
  return (
    <section>
      <h1 className={cn('text-center text-2xl', lemon.className)}>Eldani patterns collection</h1>
      <div className="grid mt-4 gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 masonry">
        {patterns.map((pattern) => (
          <PatternCard
            key={pattern.id}
            id={pattern.id}
            name={pattern.name}
            description={pattern.description}
            image={pattern.image}
            price={pattern.price}
          />
        ))}
      </div>
    </section>
  )
}
