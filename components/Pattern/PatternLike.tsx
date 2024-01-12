import { cn } from '@/lib/utils'
import { Button } from '@/shadcn/ui/button'
import { Heart } from 'lucide-react'
import React from 'react'
import colors from 'tailwindcss/colors'

const PatternLike = () => {
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
        className="p-0 m-0 h-auto w-auto bg-transparent hover:bg-transparent active:animate-pulse active:scale-125 transition"
        onClick={handleLike}
      >
        <Heart
          size={23}
          strokeWidth={1.25}
          fill={liked ? colors.rose[500] : 'none'}
          absoluteStrokeWidth
          className={cn(
            className,
          )}
        />
      </Button>
    </>
  )
}

export default PatternLike
