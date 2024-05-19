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
      <h1 className="p-4 pt-2 text-2xl font-bold">Заказы</h1>
    </div>
  )
}

export default Page
