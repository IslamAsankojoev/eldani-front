'use client'

import { Star } from 'lucide-react'
import Link from 'next/link'
import colors from 'tailwindcss/colors'

import { Card } from '@/shadcn/ui/card'

import { PatternComments } from '@/src/entities/comment'
import { PatternLike } from '@/src/entities/like'
import { cn } from '@/src/shared/libs/utils'

import { PatternCardCarousel } from './PatternCardCarousel'

export const PatternCard = ({
  id,
  name,
  description,
  price,
  thumbnails,
  slug,
}: Pattern) => {
  const patternLink = {
    href: `/pattern/${slug}?id=${id}`,
    as: `/pattern/${slug}`,
  }

  return (
    <div>
      <Link {...patternLink}>
        <Card
          className={cn(
            'relative cursor-pointer overflow-hidden rounded-lg border-2 border-none bg-transparent shadow-none h-[60vw] md:h-[40vh]',
          )}
        >
          {thumbnails && <PatternCardCarousel thumbnails={thumbnails} />}
        </Card>
      </Link>

      <div className="flex flex-col space-y-1.5 p-2 pt-0">
        <div className="flex justify-between items-center">
          <p className="text-xl font-extrabold capitalize">{price + 'c'}</p>
          <div className="flex items-center gap-0">
            <PatternComments id={id} thumbnails={thumbnails} />
            <PatternLike id={id}/>
          </div>
        </div>

        <Link {...patternLink}>
          <div className="... flex cursor-pointer items-center truncate">
            <p className="text-sm font-semibold capitalize md:text-lg">
              {name}
            </p>
            {description && (
              <p className="text-sm capitalize text-muted-foreground">
                &nbsp;-&nbsp;{description[0]?.children[0].text}
              </p>
            )}
          </div>
        </Link>

        <div className="flex items-center space-x-1 text-sm">
          <Star className="h-4 w-4 text-yellow-500" fill={colors.yellow[500]} />
          4.5 <span className="text-muted-foreground">(89)</span>
        </div>
      </div>
    </div>
  )
}
