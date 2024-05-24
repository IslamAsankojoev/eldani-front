import { useMediaQuery } from '@mui/material'
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
  const isVerySmall = useMediaQuery('(max-width: 500px)')
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
          {!isVerySmall && <TableHead>Размер</TableHead>}
          {!isVerySmall && <TableHead className="text-right">Цена</TableHead>}
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className={
              isVerySmall ? 'pr-0' : ''
            }>
              <div className="flex items-center justify-start gap-2">
                <Image
                  src={PDF}
                  alt={item.name || 'PDF'}
                  width={25}
                  height={25}
                  className="rounded-md"
                />
                <div className="flex flex-col gap-2">
                  <div className="text-pretty">
                    {item?.name}{' '}
                    {isVerySmall && (
                      <span className="font-bold">{item?.price}c</span>
                    )}
                  </div>
                  {isVerySmall && (
                    <div>
                      {item?.sizes
                        ?.map((size) => size?.value)
                        ?.map((size) => (
                          <Badge key={size} variant="outline">
                            {size}
                          </Badge>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </TableCell>
            {!isVerySmall && (
              <TableCell>
                {item?.sizes
                  ?.map((size) => size?.value)
                  ?.map((size) => (
                    <Badge key={size} variant="outline">
                      {size}
                    </Badge>
                  ))}
              </TableCell>
            )}
            {!isVerySmall && (
              <TableCell className="text-right">{item?.price}c</TableCell>
            )}
            <TableCell className="flex p-2 md:table-cell">
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
            <TableCell
              className="w-full p-4 text-right font-bold"
              colSpan={isVerySmall ? 2 : 3}
            >
              Итого: {total}c
            </TableCell>
          )}
          {/* <TableCell></TableCell> */}
        </TableRow>
      </TableFooter>
    </Table>
  )
}
