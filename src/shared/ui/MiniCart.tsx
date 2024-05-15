import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/shadcn/ui/badge'
import { Button } from '@/shadcn/ui/button'

import { useCartStore } from '@/src/app/store/cart.zustand'

export const MiniCart = () => {
  const { cart } = useCartStore()
  const count = cart?.length
  return (
    <Button
      size="icon"
      variant="ghost"
      className="relative mr-2 rounded-full"
      asChild
    >
      <Link href="/me/cart">
        {!!count && (
          <Badge className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center p-0">
            {count}
          </Badge>
        )}
        <ShoppingBag strokeWidth={1.2} />
      </Link>
    </Button>
  )
}
