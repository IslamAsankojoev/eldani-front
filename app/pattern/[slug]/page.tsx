'use client'

import { ArrowDownToLine } from 'lucide-react'
import { useQuery } from 'react-query'

import { Button } from '@/shadcn/ui/button'
import { Skeleton } from '@/shadcn/ui/skeleton'

import { PatternComments } from '@/src/entities/comment'
import { PatternLike } from '@/src/entities/like'
import {
  Description,
  PatternCarousel,
  PatternSkeleton,
  ProductService,
} from '@/src/entities/pattern'
import { useUser } from '@/src/entities/user/query'
import { cn } from '@/src/shared/libs/utils'

const Pattern = ({
  params,
  searchParams: { viewport },
}: {
  params: { slug: string }
  searchParams: { viewport: string }
}) => {
  const { data: user } = useUser()
  const { data: pattern, isLoading } = useQuery(['pattern', params.slug], () =>
    ProductService.findBySlug(params.slug, { populate: '*' }),
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
              thumbnails={pattern?.thumbnails}
              skeleton={isLoading}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between px-4 py-4 md:w-3/5 md:px-10 md:pt-10">
          <div>
            <div className="flex items-start justify-between md:flex-col md:gap-4">
              <div>
                <h1 className="hidden text-xl font-extrabold md:block md:text-3xl">
                  {isLoading ? (<Skeleton className='w-40 h-6 md:h-8'/>) : pattern?.name}
                </h1>
                <h2 className="text-3xl font-extrabold md:text-2xl">
                  {isLoading ? (<Skeleton className='w-32 h-8 md:h-6 mt-2'/>) : pattern?.price + 'c'}
                </h2>
              </div>
              <div
                className={cn(
                  'inline-grid grid-flow-col items-center justify-items-center gap-1 p-0 transition',
                )}
              >
                {isLoading ? (
                    <Skeleton className="w-64 h-6 md:h-8" />
                ) : (
                  <>
                  <PatternComments
                    id={pattern?.id as number}
                    thumbnails={pattern?.thumbnails}
                  />
                  <PatternLike id={pattern?.id} />
                  {user?.role?.type === 'admin' && (
                    <Button
                      className="h-full flex-grow bg-stone-800 text-base  text-white shadow-md hover:bg-stone-800/80"
                      variant="secondary"
                      asChild
                      size="icon"
                    >
                      <a href={pattern?.file?.url} target="_blank">
                        <ArrowDownToLine />
                      </a>
                    </Button>
                  )}

                  <Button
                    className="ml-2 h-full flex-grow bg-rose-700 text-base text-white shadow-md hover:bg-rose-700/80"
                    variant="secondary"
                    asChild
                  >
                    <a href="https://t.me/uclami" target="_blank">
                      &nbsp;&nbsp;Купить&nbsp;&nbsp;
                    </a>
                  </Button>
                </>
                )}
              </div>
            </div>
            <hr className="mt-6 border-none" />
            <h1 className="visible mb-2 text-xl font-extrabold md:hidden md:text-3xl">
              {isLoading ? (<Skeleton className='w-40 h-8'/>) : pattern?.name}
            </h1>
            {isLoading ? (
              <>
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6 mt-2" />
                <Skeleton className="h-5 w-full mt-2" />
                <Skeleton className="h-5 w-5/6 mt-2" />
                <Skeleton className="h-5 w-4/6 mt-2" />
                <Skeleton className="h-5 w-full mt-2" />
                <Skeleton className="h-5 w-5/6 mt-2" />
                <Skeleton className="h-5 w-4/6 mt-2" />
                <Skeleton className="h-5 w-5/6 mt-2" />
                <Skeleton className="h-5 w-4/6 mt-2" />
                <Skeleton className="h-5 w-4/6 mt-2" />
              </>
            ) : (<Description content={pattern?.description} />)}
            <hr className="mt-4 border-none" />
          </div>
          <div
            className={cn(
              'sticky bottom-0 left-0 -mt-20 hidden h-28 w-full md:block',
              'bg-gradient-to-t from-slate-100 to-transparent dark:from-stone-900',
            )}
          />
        </div>
    </div>
  )
}

export default Pattern
