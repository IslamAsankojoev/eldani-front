'use client'

import _ from 'lodash'
import { useQuery } from 'react-query'

import {
  PatternCard,
  PatternSkeletonCard,
  ProductService,
} from '@/src/entities/pattern'
import { cn } from '@/src/shared/libs/utils'

export default function Home() {
  const { data: patterns, isLoading } = useQuery(
    [ProductService.entity],
    () =>
      ProductService.find({
        populate: '*',
      }),
    {
      select: (data) => {
        // return _.concat(data, data, data, data, data, data)
        return data
      },
      retry: false,
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    },
  )

  return (
    <section>
      <h1 className={cn('my-6 text-center text-2xl font-extrabold md:my-10')}>
        Коллекция Eldani
      </h1>
      <div className="masonry mt-4 grid grid-cols-2 gap-5 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
        {isLoading ? (
          <>
            {_.times(5, (i) => (
              <PatternSkeletonCard key={i} />
            ))}
          </>
        ) : (
          <>
            {patterns?.map((pattern: Pattern) => (
              <PatternCard key={pattern.id} {...pattern} />
            ))}
          </>
        )}
      </div>
    </section>
  )
}
