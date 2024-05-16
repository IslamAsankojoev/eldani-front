'use client'

import { useQuery } from 'react-query'

import { Content, PageService } from '@/src/entities/page'

const Page = ({ params }: { params: { slug: string } }) => {
  const { data: page, isLoading } = useQuery(['page', params.slug], () =>
    PageService.findBySlug(params.slug, { populate: '*' }),
  )
  return (
    <div>
      <Content content={page?.content} />
    </div>
  )
}

export default Page
