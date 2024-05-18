'use client'

import React, { FC } from 'react'

import { Heart } from 'lucide-react'
import colors from 'tailwindcss/colors'

import { Button } from '@/shadcn/ui/button'

import { useFavouriteStore } from '@/src/app/store/favourite.zustand'
import { cn } from '@/src/shared/libs/utils'

interface PatternLikeProps {
  id?: number
}

export const PatternLike: FC<PatternLikeProps> = ({ id }) => {
  const [className, setClassName] = React.useState('')
  const { addFavorite, favourites, removeFavorite } = useFavouriteStore()
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
      cn(
        prev,
        liked
          ? 'text-rose-500 dark:text-rose-500'
          : 'text-black dark:text-white',
      ),
    )
  }, [liked])

  return (
    <>
      <Button
        variant="ghost"
        className="relative m-0 h-auto w-auto bg-transparent p-2 transition hover:bg-transparent active:scale-125 active:animate-pulse"
        onClick={handleLike}
      >
        <Heart
          size={25}
          strokeWidth={1.3}
          fill={liked ? colors.rose[500] : 'none'}
          absoluteStrokeWidth
          className={cn(className)}
        />
      </Button>
    </>
  )
}
