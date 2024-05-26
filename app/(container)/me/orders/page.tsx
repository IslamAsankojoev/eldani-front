'use client'

import _ from 'lodash'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useQuery } from 'react-query'

import { Card } from '@/shadcn/ui/card'

import { UserService } from '@/src/entities/user'
import { OrderTable } from '@/src/features/order'
import { cn } from '@/src/shared'

import emptyDark from '/public/emptyDark.png'
import emptyLight from '/public/emptyLight.png'

const Page = () => {
  const { theme } = useTheme()
  const { data } = useQuery('orders', () =>
    UserService.findOrders({
      populate: 'orders',
    }),
  )
  const isEmpty = _.isEmpty(data)

  return (
    <div className="flex h-full flex-col">
      <h1 className="p-4 pt-2 text-2xl font-bold">Заказы</h1>
      <div
        className={cn(
          'flex flex-grow flex-col items-center gap-3',
          isEmpty && 'pointer-events-none justify-center',
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
            <h2 className="text-lg font-bold">Заказов нет</h2>
            <p className="text-muted-foreground">
              Вы еще ничего не заказали? (╯°□°）╯︵ ┻━┻)
            </p>
          </div>
        ) : (
          <>
            <Card className="w-full border-0 bg-white dark:bg-stone-950/60">
              <OrderTable orders={data} />
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

export default Page
