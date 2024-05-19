import _ from 'lodash'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Badge } from '@/shadcn/ui/badge'
import { Button } from '@/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/ui/table'

import { useCartStore } from '@/src/app/store/cart.zustand'

import PDF from '/public/pdf.svg'

export const CartTable = () => {
  const { cart, removeFromCart } = useCartStore()
  const router = useRouter()
  const isEmpty = _.isEmpty(cart)

  const total = cart?.reduce((acc, item) => acc + Number(item?.price), 0)

  const handleDelete = (id: number) => {
    removeFromCart(id)
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Паттерн</TableHead>
          <TableHead>Размер</TableHead>
          <TableHead className=" text-right">Цена</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Image
                  src={PDF}
                  alt={item.name || 'PDF'}
                  width={25}
                  height={25}
                  className="rounded-md"
                />
                {item?.name}
              </div>
            </TableCell>
            <TableCell>
              {item?.sizes
                ?.map((size) => size?.value)
                ?.map((size) => (
                  <Badge key={size} variant="outline">
                    {size}
                  </Badge>
                ))}
            </TableCell>
            <TableCell className=" text-right">{item?.price}c</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      router.push(`/pattern/${item.slug}`)
                    }}
                  >
                    Перейти
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      handleDelete(item.id)
                    }}
                  >
                    Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          {isEmpty ? null : (
            <TableCell className="w-full text-right font-bold" colSpan={3}>
              Итого: {total}c
            </TableCell>
          )}
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
