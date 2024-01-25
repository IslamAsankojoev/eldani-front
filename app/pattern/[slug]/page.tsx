import { unstable_cache } from 'next/cache'

import {
  Description,
  PatternCarousel,
  ProductService,
} from '@/src/entities/pattern'
import { cn } from '@/src/shared/libs/utils'
import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'
import { PatternComments } from '@/src/entities/comment'

export const revalidate = 0

const getCachedUser = unstable_cache(
  async (id) => getData({ params: { slug: id } }),
  ['pattern'],
)

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
      <div className="md:w-2/5">
        {pattern.thumbnails && (
          <PatternCarousel thumbnails={pattern.thumbnails} />
        )}
      </div>
      
      <div className="p-4 pt-10 md:w-3/5 md:p-16">
        <h1 className="text-xl font-extrabold md:text-3xl">{pattern.name}</h1> 
        <br />
        <Card className="inline-flex gap-2 p-2  dark:bg-stone-700 dark:border-stone-950 hover:border-rose-600 hover:dark:border-rose-100 transition">
          <span className={cn(
            "block w-fit text-lg font-bold md:text-xl !leading-10",
            // "after:block after:h-1 after:w-full after:bg-rose-500 after:rounded-2xl",
            // "before:block before:h-1 before:w-full before:bg-rose-500 before:rounded-2xl",
          )}>
            &nbsp;&nbsp;{pattern.price}c&nbsp;&nbsp;
          </span> 
          <Button className='rounded-sm text-base dark:bg-stone-800 dark:hover:bg-stone-900' variant='secondary'>
            Купить
          </Button>
        </Card>    
        <hr className="mt-4 border-none" />

        <Description content={pattern.description} />
        <hr className="mt-4 border-none" />
      </div>
    </div>
  )
}

export default Pattern
