'use client'
import PatternCard from '@/components/Pattern/PatternCard'
import { cn } from '@/lib/utils'
import _ from 'lodash'
import { useQuery } from 'react-query'
import { ProductService } from '@/service/pattern.service'
import { useEffect, useState } from 'react'

export default function Home() {
  const { data } = useQuery([ProductService.entity], ProductService.getAll)

  return (
    <section>
      <h1 className={cn('text-center text-2xl font-extrabold mt-4')}>Eldani patterns collection</h1>
      <div className="grid mt-4 gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 masonry">
        {data?.map((pattern) => (
          <PatternCard
            key={pattern.id}
            id={pattern.id}
            name={pattern.name}
            description={pattern.description}
            thumbnails={pattern.thumbnails}
            price={pattern.price}
          />
        ))}
      </div>
    </section>
  )
}
