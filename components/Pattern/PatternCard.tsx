'use client'
import { cn } from '@/lib/utils'
import { Card } from '@/shadcn/ui/card'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { LoremIpsum } from 'lorem-ipsum'
import { Star } from 'lucide-react'
import colors from 'tailwindcss/colors'
import PatternComments from './PatternComments'
import PatternLike from './PatternLike'

type PatternCardProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string
  name: string
  description: string
  image: any
  price: number
}

const PatternCard = ({
  className,
  id,
  name,
  description,
  image,
  price,
  ...props
}: PatternCardProps) => {
  const { theme } = useTheme()

  return (
    <>
      <div
        style={{
          breakInside: 'avoid',
        }}
      >
        <Card
          className={cn('overflow-hidden border-none relative border-2', className)}
          style={{
            boxShadow: theme === 'dark' ? 'none' : '0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.05)',
          }}
        >
          <Image
            src={image}
            width={300}
            height={300}
            alt="Image"
            className="object-cover w-[300px] h-[300px]"
          />
        </Card>

        <div className="flex flex-col space-y-1.5 p-2">
          <div className="flex justify-between">
            <p className="text-xl capitalize font-extrabold">{price + 'c'}</p>
            <div className="flex gap-4 items-center">
              <PatternComments />
              <PatternLike />
            </div>
          </div>

          <div className="flex items-center truncate ...">
            <p className="text-sm md:text-lg font-semibold capitalize">{name}</p>
            <p className="text-sm text-muted-foreground capitalize">&nbsp;-&nbsp;{description}</p>
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
