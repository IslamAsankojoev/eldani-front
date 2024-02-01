import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'

import { PatternComments } from '@/src/entities/comment'
import { PatternLike } from '@/src/entities/like'
import {
  Description,
  PatternCarousel,
  ProductService,
} from '@/src/entities/pattern'
import { cn } from '@/src/shared/libs/utils'

export const revalidate = 1

// const getCachedUser = unstable_cache(
//   async (id) => getData({ params: { slug: id } }),
//   ['pattern'],
// )

async function getData({ params }: { params: { slug: string } }) {
  const pattern = await ProductService.findBySlug(params.slug, {
    populate: '*',
  })
  return pattern
}

const Pattern = async ({
  params,
  searchParams: { viewport },
}: {
  params: { slug: string }
  searchParams: { viewport: string }
}) => {
  const pattern = await getData({ params })
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
          {pattern.thumbnails && (
            <PatternCarousel thumbnails={pattern.thumbnails} />
          )}
        </div>
      </div>

      <div className="p-4 pt-6 md:w-3/5 md:px-10 md:pt-10">
        <div className="flex items-center justify-between md:flex-col md:items-start md:gap-4">
          <div>
            <h1 className="flex items-center text-xl font-extrabold md:text-3xl">
              {pattern.name} - {pattern.price}c&nbsp;&nbsp;
            </h1>
          </div>
          <div
            className={cn(
              'inline-grid grid-flow-col items-center justify-items-center gap-1 p-0 transition ',
            )}
          >
            <PatternComments id={pattern.id} thumbnails={pattern.thumbnails} />
            <PatternLike />
            <span className='mx-1'/>
            <Button
              className="h-full flex-grow bg-slate-500 text-base text-white shadow-md hover:bg-slate-500/80 dark:bg-stone-700 dark:hover:bg-stone-700/80"
              variant="secondary"
            >
              &nbsp;&nbsp;Купить&nbsp;&nbsp;
            </Button>
          </div>
        </div>
        <hr className="mt-4 border-none" />

        <Description content={pattern.description} />
        <hr className="mt-4 border-none" />
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
