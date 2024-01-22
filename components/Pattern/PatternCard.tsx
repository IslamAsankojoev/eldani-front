'use client'
import { cn } from '@/lib/utils'
import { Card } from '@/shadcn/ui/card'
import { useTheme } from 'next-themes'
import { Star } from 'lucide-react'
import colors from 'tailwindcss/colors'
import PatternComments from './PatternComments'
import PatternLike from './PatternLike'
import PatternCardCarousel from './PatternCardCarousel'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type PatternCardProps = Pick<
  Pattern,
  'id' | 'name' | 'description' | 'price' | 'thumbnails' | 'slug'
>

const PatternCard = ({ id, name, description, price, thumbnails, slug }: PatternCardProps) => {
  const { theme } = useTheme()
  const router = useRouter()
  const patternLink = {
    href: `/pattern/${slug}?id=${id}`,
    as: `/pattern/${slug}`,
  }

  return (
    <>
      <div>
        <Link {...patternLink}>
          <Card
            className={cn(
              'overflow-hidden border-none relative border-2 rounded-lg cursor-pointer shadow-none bg-transparent',
            )}
          >
            {thumbnails && <PatternCardCarousel thumbnails={thumbnails} />}
          </Card>
        </Link>

        <div className="flex flex-col space-y-1.5 p-2">
          <div className="flex justify-between">
            <p className="text-xl capitalize font-extrabold">{price + 'c'}</p>
            <div className="flex gap-3 items-center">
              <PatternComments id={id} thumbnails={thumbnails} />
              <PatternLike />
            </div>
          </div>

          <Link {...patternLink}>
            <div className="cursor-pointer flex items-center truncate ...">
              <p className="text-sm md:text-lg font-semibold capitalize">{name}</p>
              {description && (
                <p className="text-sm text-muted-foreground capitalize">
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
    </>
  )
}

export default PatternCard
