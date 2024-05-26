import { FC } from 'react'

import { Status } from '@/types/global.exports'
import { useMediaQuery } from '@mui/material'
import _ from 'lodash'
import { ArrowDownToLine, CircleHelp, MoreHorizontal } from 'lucide-react'
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
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/ui/table'

import {
  statusColor,
  translateStatus,
} from '@/src/app/constants/order.statuses'
import { cn } from '@/src/shared'

interface OrderTableProps {
  orders: Order[] | undefined
}

export const OrderTable: FC<OrderTableProps> = ({ orders }) => {
  const router = useRouter()
  const isVerySmall = useMediaQuery('(max-width: 900px)')

  const handleClickOrder = (id: string) => {
    router.push(`/me/orders/${id}`)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{isVerySmall ? 'Заказ' : 'Номер'}</TableHead>
          {!isVerySmall && <TableHead>Статус</TableHead>}
          {!isVerySmall && <TableHead>Примечание</TableHead>}
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((item) => (
          <TableRow
            key={item.id}
            className={cn(
              'cursor-pointer',
              item?.status === Status.Paid ? '' : 'pointer-events-none',
            )}
            onClick={() => {
              handleClickOrder(String(item.id) as string)
            }}
          >
            <TableCell
              colSpan={isVerySmall && item?.status !== Status.Paid ? 3 : 1}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="font-bold">{item?.uuid}</div>
                  {isVerySmall && (
                    <Badge
                      style={{
                        backgroundColor:
                          item?.status && statusColor(item?.status),
                      }}
                      className="text-center !font-semibold uppercase"
                    >
                      {item?.status && translateStatus(item?.status)}
                    </Badge>
                  )}
                </div>
                {isVerySmall && <div className="text-pretty">{item?.note}</div>}
              </div>
            </TableCell>
            {!isVerySmall && (
              <TableCell>
                <Badge
                  style={{
                    backgroundColor: item?.status && statusColor(item?.status),
                  }}
                  className="!font-semibold uppercase"
                >
                  {item?.status && translateStatus(item?.status)}
                </Badge>
              </TableCell>
            )}
            {!isVerySmall && (
              <TableCell colSpan={isVerySmall ? 2 : 1}>{item?.note}</TableCell>
            )}
            {item?.status === Status.Paid && (
              <TableCell className="flex justify-end p-2 md:table-cell">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={() => {
                        router.push(`/me/orders/${item.id}`)
                      }}
                    >
                      <ArrowDownToLine className="h-4 w-4" /> Загрузить макет
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <CircleHelp className="h-4 w-4" />
                      Есть вопросы?
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
