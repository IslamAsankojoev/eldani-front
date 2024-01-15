'use client'
import { cn } from '@/lib/utils'
import { Card } from '@/shadcn/ui/card'
import { useTheme } from 'next-themes'
import { Star } from 'lucide-react'
import colors from 'tailwindcss/colors'
import PatternComments from './PatternComments'
import PatternLike from './PatternLike'
import PatternCarousel from './PatternCarousel'

type PatternCardProps = Pick<Pattern, 'id' | 'name' | 'description' | 'price' | 'thumbnails'>

const PatternCard = ({ id, name, description, price, thumbnails }: PatternCardProps) => {
  const { theme } = useTheme()
  return (
    <>
      <div
        style={{
          breakInside: 'avoid',
        }}
      >
        <Card
          className={cn('overflow-hidden border-none relative border-2 rounded-lg')}
          style={{
            boxShadow: theme === 'dark' ? 'none' : '0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.05)',
          }}
        >
          {thumbnails && <PatternCarousel thumbnails={thumbnails} />}
        </Card>

        <div className="flex flex-col space-y-1.5 p-2">
          <div className="flex justify-between">
            <p className="text-xl capitalize font-extrabold">{price + 'c'}</p>
            <div className="flex gap-3 items-center">
              <PatternComments id={id} />
              <PatternLike />
            </div>
          </div>

          <div className="flex items-center truncate ...">
            <p className="text-sm md:text-lg font-semibold capitalize">{name}</p>
            {description && (
              <p className="text-sm text-muted-foreground capitalize">
                &nbsp;-&nbsp;{description[0]?.children[0].text}
              </p>
            )}
          </div>

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
