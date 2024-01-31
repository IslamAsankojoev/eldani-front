import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'

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

      <div className="p-4 pt-10 md:w-3/5 md:px-10">
        <h1 className="text-xl font-extrabold md:text-3xl">{pattern.name}</h1>
        <br />
        <Card
          className={cn(
            'inline-grid grid-flow-col justify-items-stretch overflow-hidden border-none p-0  shadow-md transition dark:border-stone-950 dark:bg-stone-700',
            // 'hover:border-rose-600 hover:dark:border-rose-100',
          )}
        >
          <span
            className={cn(
              'block w-fit p-2 text-lg font-bold !leading-10 md:text-xl',
            )}
          >
            &nbsp;&nbsp;{pattern.price}c&nbsp;&nbsp;
          </span>
          <Button
            className="h-full flex-grow rounded-none bg-slate-200 text-base hover:bg-slate-300 dark:bg-stone-800 dark:hover:bg-stone-600"
            variant="secondary"
          >
            &nbsp;&nbsp;Купить&nbsp;&nbsp;
          </Button>
        </Card>
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
