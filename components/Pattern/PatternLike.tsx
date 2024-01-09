import { cn } from '@/lib/utils'
import { Heart } from 'lucide-react'
import React from 'react'
import colors from 'tailwindcss/colors'

const PatternLike = () => {
  const [liked, setLiked] = React.useState(false)
  const [className, setClassName] = React.useState(
    cn('cursor-pointer transition-all active:animate-pulse active:scale-125'),
  )

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
      <Heart
        size={23}
        strokeWidth={1.25}
        fill={liked ? colors.rose[500] : 'none'}
        absoluteStrokeWidth
        className={className}
        onClick={handleLike}
      />
    </>
  )
}

export default PatternLike
