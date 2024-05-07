'use client'
import { Button } from '@/shadcn/ui/button'
import { Skeleton } from '@/shadcn/ui/skeleton'

import { PatternComments } from '@/src/entities/comment'
import { PatternLike } from '@/src/entities/like'
import {
  Description,
  PatternCarousel,
  ProductService,
} from '@/src/entities/pattern'
import { cn } from '@/src/shared/libs/utils'
import { useQuery } from 'react-query'
import { ArrowDownToLine } from 'lucide-react'
import { useUser } from '@/src/entities/user/query'

const Pattern = ({
  params,
  searchParams: { viewport },
}: {
  params: { slug: string }
  searchParams: { viewport: string }
}) => {
  const { data: user } = useUser()
  const {data:pattern, isLoading} = useQuery(['pattern', params.slug], () => ProductService.findBySlug(params.slug, {populate: '*'}))
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
            <PatternCarousel thumbnails={pattern?.thumbnails} skeleton={isLoading}/>
        </div>
      </div>

      <div className="flex flex-col justify-between px-4 py-3 md:w-3/5 md:px-10 md:pt-10">
        <div>
          <div className="flex items-start justify-between md:flex-col md:gap-4">
            <div>
              {isLoading ? (
                <Skeleton className="h-8 w-60 d-block my-2" />
              ) : (
                <h1 className="text-xl font-extrabold md:text-3xl hidden md:block">
                {pattern?.name}
              </h1>
              )}
              {isLoading ? (
                <Skeleton className="h-6 w-52 d-block my-2" />
              ) : (
                <h2 className="text-3xl font-extrabold md:text-2xl">
                {pattern?.price}c
              </h2>
              )}
            </div>
            <div
              className={cn(
                'inline-grid grid-flow-col items-center justify-items-center gap-1 p-0 transition',
              )}
            >
              {isLoading ? (
                <Skeleton className="h-8 w-60 d-block" />
              ) : (
               <>
                <PatternComments
                  id={pattern?.id as number}
                  thumbnails={pattern?.thumbnails}
                />
              <PatternLike id={pattern?.id}/>
              <span className="mx-1" />
              {user?.role?.type === 'admin' && (
                <Button
                className="h-full flex-grow text-base shadow-md  bg-stone-800 hover:bg-stone-800/80 text-white"
                variant="secondary"
                asChild
                size='icon'
              >
                <a href={pattern?.file?.url} target="_blank">
                <ArrowDownToLine />
                </a>
              </Button>
              )}
              
              <Button
                className="h-full flex-grow text-base text-white ml-2 shadow-md bg-rose-700 hover:bg-rose-700/80"
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
          {isLoading ? (
                <Skeleton className="h-8 w-60 d-block my-2" />
              ) : (
                <h1 className="text-xl font-extrabold md:text-3xl md:hidden visible mb-2">
                {pattern?.name}
              </h1>
              )}
          {isLoading ? (
            <>
            <Skeleton className="h-6 w-full d-block my-2" />
            <Skeleton className="h-6 w-full d-block my-2" />
            <Skeleton className="h-6 w-72 d-block my-2" />
            <Skeleton className="h-6 w-60 d-block my-2" />
            <br />
            <Skeleton className="h-6 w-full d-block my-2" />
            <Skeleton className="h-6 w-full d-block my-2" />
            <Skeleton className="h-6 w-60 d-block my-2" />
            <Skeleton className="h-6 w-60 d-block my-2" />
            </>
          ): (
            <Description content={pattern?.description} />
          )}
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
