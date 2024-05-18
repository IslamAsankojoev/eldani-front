'use client'

import { useQuery } from 'react-query'

import { PageService } from '@/src/entities/page'
import { RichContent } from '@/src/shared'

const Page = ({ params }: { params: { slug: string } }) => {
  const { data: page } = useQuery(['page', params.slug], () =>
    PageService.findBySlug(params.slug, { populate: '*' }),
  )
  return (
    <div className="py-5">
      <RichContent content={page?.content} />
    </div>
  )
}

export default Page
