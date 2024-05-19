'use client'

import { useMediaQuery } from '@mui/material'
import _ from 'lodash'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useQueryClient } from 'react-query'

import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'

import { useCartStore } from '@/src/app/store/cart.zustand'
import { CartTable } from '@/src/features/cart'
import { cn } from '@/src/shared'

import emptyDark from '/public/emptyDark.png'
import emptyLight from '/public/emptyLight.png'

const Page = () => {
  const { cart, clearCart } = useCartStore()
  const { theme } = useTheme()
  const isEmpty = _.isEmpty(cart)
  const queryClient = useQueryClient()
  const isVerySmall = useMediaQuery('(max-width: 400px)')

  const handleClearCart = () => {
    clearCart()
    queryClient.setQueryData(['cart'], () => {
      return []
    })
  }

  return (
    <div className="flex flex-col">
      <h1 className="p-4 pt-2 text-2xl font-bold">Корзина</h1>
      <div
        className={cn(
          'flex flex-col items-center gap-3',
          isEmpty && 'pointer-events-none',
        )}
      >
        {isEmpty ? (
          <div className="flex h-64 w-full max-w-64 flex-col items-center justify-center text-center opacity-70">
            <Image
              src={theme === 'dark' ? emptyDark : emptyLight}
              alt="Empty cart"
              width={50}
              height={50}
            />
            <h2 className="text-lg font-bold">Корзина пуста</h2>
            <p className="text-muted-foreground">
              Добавьте товары в корзину, чтобы оформить заказ
            </p>
          </div>
        ) : (
          <>
            <Card className="w-full border-0 bg-white dark:bg-stone-950/60">
              <CartTable />
            </Card>
            <div
              className={cn(
                'flex w-full gap-2 md:justify-end',
                isVerySmall ? 'flex-col' : 'justify-between',
              )}
            >
              <Button
                size="lg"
                className="flex-grow bg-white text-base dark:bg-stone-950/60 md:flex-grow-0"
                variant="ghost"
                onClick={handleClearCart}
              >
                Очистить корзину
              </Button>
              <Button size="lg" className="flex-grow text-base md:flex-grow-0">
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Page
