'use client'
import { useQuery } from 'react-query'
import { cn } from '@/src/shared/libs/utils'
import _ from 'lodash'
import { useEffect } from 'react'
import { PatternCard, PatternSkeleton, ProductService } from '@/src/entities/pattern'

export default function Home({ searchParams }: { searchParams: { viewport: string } }) {
  const {
    data: patterns,
    isLoading,
  } = useQuery(
    [ProductService.entity],
    () =>
      ProductService.find({
        populate: '*',
      }),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    },
  )

  useEffect(() => {
    localStorage.setItem('viewport', searchParams.viewport)
  }, [searchParams.viewport])

  return (
    <section>
      <h1 className={cn('text-center text-2xl font-extrabold my-6 md:my-10')}>
        Eldani patterns collection
      </h1>
      <div className="grid mt-4 gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 masonry">
        {isLoading ? (
          <>
            {_.times(5, (i) => (
              <PatternSkeleton />
            ))}
          </>
        ) : (
          <>
            {patterns?.map((pattern: Pattern) => (
              <PatternCard
                key={pattern.id}
                {...pattern}
              />
            ))}
          </>
        )}
      </div>
    </section>
  )
}
