import {
  type BlocksContent,
  BlocksRenderer,
} from '@strapi/blocks-react-renderer'
import { unstable_cache } from 'next/cache'

import {
  Description,
  PatternCarousel,
  ProductService,
} from '@/src/entities/pattern'
import { cn } from '@/src/shared/libs/utils'

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
      <div className="md:w-3/5 p-4 pt-10 md:p-16">
        <h1 className="text-xl md:text-3xl font-extrabold">{pattern.name}</h1>
        <h2 className="text-lg md:text-2xl font-bold">
          <span className="block w-fit after:block after:h-1 after:w-full after:bg-rose-500">
            {pattern.price}c
          </span>
        </h2>
        <hr className="mt-4 border-none" />
        <Description content={pattern.description} />
      </div>
    </div>
  )
}

export default Pattern
