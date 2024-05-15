'use client'

import _ from 'lodash'
import { Minus, X } from 'lucide-react'
import { useQuery, useQueryClient } from 'react-query'

import { Button } from '@/shadcn/ui/button'

import { useCartStore } from '@/src/app/store/cart.zustand'
import {
  PatternCard,
  PatternSkeletonCard,
  ProductService,
} from '@/src/entities/pattern'

const Page = () => {
  const { cart, removeFromCart } = useCartStore()
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery(
    ['cart', cart],
    () => ProductService.findByArrayIds(cart),
    {
      enabled: cart.length > 0,
    },
  )
  const totalSumm = cart.length
    ? data?.reduce((acc, pattern) => acc + Number(pattern.price), 0)
    : 0

  const handleRemove = (id: number) => {
    queryClient.setQueryData(['cart', cart], (old: any) => {
      return old?.filter((pattern: Pattern) => pattern.id !== id)
    })
    removeFromCart(id)
  }
  return (
    <div>
      <h1 className="p-4 pt-2 text-2xl font-bold">
        Корзина
        <span className="text-xl text-rose-500">
          {!!totalSumm && ` ${cart?.length} / ${totalSumm}c`}
        </span>
      </h1>
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
              <div className="relative">
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
    </div>
  )
}

export default Page
