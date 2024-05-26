'use client'

import { ArrowDownToLine, ShoppingBag } from 'lucide-react'
import { useQuery } from 'react-query'

import { Button } from '@/shadcn/ui/button'
import { Skeleton } from '@/shadcn/ui/skeleton'

import { useCartStore } from '@/src/app/store/cart.zustand'
import { PatternComments } from '@/src/entities/comment'
import {
  Description,
  PatternCarousel,
  ProductService,
} from '@/src/entities/pattern'
import { AddToCart, PatternLike } from '@/src/entities/user'
import { cn } from '@/src/shared/libs/utils'

const Pattern = ({
  params,
  searchParams: { viewport },
}: {
  params: { slug: string }
  searchParams: { viewport: string }
}) => {
  const { data: pattern, isLoading } = useQuery(['pattern', params.slug], () =>
    ProductService.findBySlug(params.slug, {
      populate: 'thumbnails,category,sizes,sizes.file',
    }),
  )

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:py-10',
        viewport === 'mobile' ? '' : 'container',
        'initial-container md:container',
      )}
    >
      <div className="relative md:w-2/5">
        <div className="md:sticky md:top-36">
          <PatternCarousel
            thumbnails={pattern?.thumbnails as Media[]}
            skeleton={isLoading}
          />
        </div>
      </div>

      <div className="flex flex-col justify-between px-4 py-4 md:w-3/5 md:px-10 md:pt-10">
        <div>
          <div className="flex items-start justify-between md:flex-col md:gap-4">
            <div>
              <h1 className="hidden text-pretty text-xl font-extrabold md:block md:text-3xl">
                {isLoading ? (
                  <Skeleton className="h-6 w-40 md:h-8" />
                ) : (
                  pattern?.name
                )}
              </h1>
              <h2 className="mt-2 text-3xl font-extrabold md:text-2xl">
                {isLoading ? (
                  <Skeleton className="h-10 w-32 md:mt-2 md:h-6" />
                ) : (
                  pattern?.price + 'c'
                )}
              </h2>
            </div>
            <div
              className={cn(
                'inline-grid grid-flow-col items-center justify-items-center gap-1 p-0 transition',
              )}
            >
              {isLoading ? (
                <div className="flex flex-row">
                  <Skeleton className="mr-2 h-10 w-10 md:h-8" />
                  <Skeleton className="mr-2 h-10 w-10 md:h-8" />
                  <Skeleton className="h-10 w-24 md:h-8" />
                </div>
              ) : (
                <>
                  <PatternComments
                    id={pattern?.id as number}
                    thumbnails={pattern?.thumbnails}
                  />
                  <PatternLike id={pattern?.id} />
                  <AddToCart {...(pattern as Pattern)} />
                </>
              )}
            </div>
          </div>
          <hr className="mt-6 border-none" />
          <h1 className="visible mb-2 text-pretty text-2xl font-extrabold md:hidden md:text-3xl">
            {isLoading ? <Skeleton className="h-8 w-5/6" /> : pattern?.name}
          </h1>
          {isLoading ? (
            <>
              <Skeleton className="h-5 w-full" />
              <Skeleton className="mt-2 h-5 w-5/6" />
              <Skeleton className="mt-2 h-5 w-full" />
              <Skeleton className="mt-2 h-5 w-5/6" />
              <Skeleton className="mt-2 h-5 w-4/6" />
              <Skeleton className="mt-2 h-5 w-full" />
              <Skeleton className="mt-2 h-5 w-5/6" />
              <Skeleton className="mt-2 h-5 w-4/6" />
              <Skeleton className="mt-2 h-5 w-5/6" />
              <Skeleton className="mt-2 h-5 w-4/6" />
              <Skeleton className="mt-2 h-5 w-4/6" />
            </>
          ) : (
            <Description content={pattern?.description} />
          )}
          <hr className="mt-4 border-none" />
        </div>
      </div>
    </div>
  )
}

export default Pattern
