import { cn } from '@/src/shared/libs/utils'
import { unstable_cache } from 'next/cache'
import { PatternCarousel, ProductService } from '@/src/entities/pattern'

export const revalidate = 0

const getCachedUser = unstable_cache(async (id) => getData({ params: { slug: id } }), ['pattern'])

async function getData({ params }: { params: { slug: string } }) {
  const pattern = await ProductService.findBySlug(params.slug, { populate: '*' })
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
        'flex md:py-10 flex-col md:flex-row',
        viewport === 'mobile' ? '' : 'container',
        'initial-container md:container',
      )}
    >
      <div className="flex-grow-[1]">
        {pattern.thumbnails && <PatternCarousel thumbnails={pattern.thumbnails} />}
      </div>
      <div className="flex-grow-[2] p-10">
        <h1>{pattern.name}</h1>
        <h2>{pattern.price}c</h2>
      </div>
    </div>
  )
}

export default Pattern
