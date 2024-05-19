'use client'

import _ from 'lodash'
import { Minus, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useQuery, useQueryClient } from 'react-query'

import { Button } from '@/shadcn/ui/button'

import { useFavouriteStore } from '@/src/app/store/favourite.zustand'
import {
  PatternCard,
  PatternSkeletonCard,
  ProductService,
} from '@/src/entities/pattern'

import emptyDark from '/public/emptyDark.png'
import emptyLight from '/public/emptyLight.png'

const Page = () => {
  const { favourites, removeFavorite } = useFavouriteStore()
  const { theme } = useTheme()
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery(
    ['favourites', favourites],
    () => ProductService.findByArrayIds(favourites),
    {
      enabled: !!favourites.length,
    },
  )

  const handleRemove = (id: number) => {
    queryClient.setQueryData(['favourites', favourites], (old: any) => {
      return old?.filter((pattern: Pattern) => pattern.id !== id)
    })
    removeFavorite(id)
  }
  return (
    <div>
      <h1 className="p-4 pt-2 text-2xl font-bold">Сохраненные</h1>
      {_.isEmpty(favourites) ? (
        <div className="flex justify-center">
          <div className="flex h-64 w-full max-w-64 flex-col items-center justify-center text-center opacity-70">
            <Image
              src={theme === 'dark' ? emptyDark : emptyLight}
              alt="Empty cart"
              width={50}
              height={50}
            />
            <h2 className="text-lg font-bold">Тут пусто</h2>
            <p className="text-muted-foreground">
              Вам не понравились наши паттерны?
            </p>
          </div>
        </div>
      ) : (
        <div className="masonry grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            <>
              {_.times(2, (i) => (
                <PatternSkeletonCard key={i} />
              ))}
            </>
          ) : (
            <>
              {data?.map((pattern: Pattern) => (
                <div className="relative" key={pattern.id}>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute right-0 top-0 z-10 h-6 w-6 -translate-y-1/2 translate-x-1/2 rounded-full"
                    onClick={() => handleRemove(pattern.id)}
                  >
                    <X size={16} />
                  </Button>
                  <PatternCard key={pattern.id} {...pattern} />
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default Page
