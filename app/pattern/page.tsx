import { ProductService } from '@/service/pattern.service'
import PatternCarousel from '../../components/Pattern/PatternCarousel'
import Image from 'next/image'

export async function generateStaticParams() {
  const posts = await ProductService.find()
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

async function getData({ searchParams }: { searchParams: { slug: string, id: string } }) {
  const pattern = await ProductService.findOne(Number(searchParams.id))
  return pattern
}

const Pattern = async ({ searchParams }: { searchParams: { slug: string, id: string } }) => {
  const pattern = await getData({ searchParams })
  console.log(pattern)
  return (
    <div>
      {pattern.thumbnails && <Image src={process.env.API_URL + pattern?.thumbnails[0]?.url} alt="Image" width={400} height={600} />}
      <h1>Pattern: {pattern.name}</h1>
      <h1>
        {pattern.price}c
      </h1>
    </div>
  )
}

export default Pattern