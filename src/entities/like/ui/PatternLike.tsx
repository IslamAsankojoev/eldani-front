'use client'
import { cn } from '@/src/shared/libs/utils'
import { Button } from '@/shadcn/ui/button'
import { Heart } from 'lucide-react'
import React from 'react'
import colors from 'tailwindcss/colors'

export const PatternLike = () => {
  const [liked, setLiked] = React.useState(false)
  const [className, setClassName] = React.useState('')

  const handleLike = () => {
    setLiked(!liked)
  }

  React.useEffect(() => {
    setClassName((prev) =>
      cn(prev, liked ? 'text-rose-500 dark:text-rose-500' : 'text-black dark:text-white'),
    )
  }, [liked])

  return (
    <>
      <Button
        variant="ghost"
        className="p-2 m-0 h-auto w-auto bg-transparent hover:bg-transparent active:animate-pulse active:scale-125 transition relative"
        onClick={handleLike}
      >
        <Heart
          size={23}
          strokeWidth={1.25}
          fill={liked ? colors.rose[500] : 'none'}
          absoluteStrokeWidth
          className={cn(className)}
        />
      </Button>
    </>
  )
}