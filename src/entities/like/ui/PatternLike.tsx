'use client'
import { cn } from '@/src/shared/libs/utils'
import { Button } from '@/shadcn/ui/button'
import { Heart } from 'lucide-react'
import React, { FC } from 'react'
import colors from 'tailwindcss/colors'
import { useFavouriteStore } from '@/src/app/store/favourite.zustand'

interface PatternLikeProps {
  id?: number
}

export const PatternLike:FC<PatternLikeProps> = ({id}) => {
  const [className, setClassName] = React.useState('')
  const {addFavorite, favourites, removeFavorite} = useFavouriteStore()
  const liked = favourites.includes(id as number)

  const handleLike = () => {
    if (liked) {
      removeFavorite(id as number)
    } else {
      addFavorite(id as number)
    }
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
          size={25}
          strokeWidth={1.30}
          fill={liked ? colors.rose[500] : 'none'}
          absoluteStrokeWidth
          className={cn(className)}
        />
      </Button>
    </>
  )
}