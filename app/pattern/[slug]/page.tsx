import { ProductService } from '@/service/pattern.service'
import PatternCarousel from '@/components/Pattern/PatternCarousel'
import { Comp } from '@/components/Comp'

export const revalidate = 0

export async function generateStaticParams() {
  const posts = await ProductService.find()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

async function getData({ searchParams }: { searchParams: { slug: string; id: string } }) {
  const pattern = await ProductService.findOne(Number(searchParams.id), {populate: '*'})
  return pattern
}

const Pattern = async ({ searchParams }: { searchParams: { slug: string; id: string } }) => {
  const pattern = await getData({ searchParams })
  return (
    <div className="flex py-2 md:py-10 flex-col md:flex-row">
      <div className="flex-grow-[1]">
        {pattern.thumbnails && <PatternCarousel thumbnails={pattern.thumbnails} />}
      </div>
      <div className="flex-grow-[2] p-10">
        <h1>{pattern.name}</h1>
        <h2>{pattern.price}c</h2>
      </div>
      <Comp />
    </div>
  )
}

export default Pattern


