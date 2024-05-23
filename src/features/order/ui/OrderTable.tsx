import { FC } from 'react'

import { Status } from '@/types/global.exports'
import { useMediaQuery } from '@mui/material'
import _ from 'lodash'
import { ArrowBigDownDash } from 'lucide-react'

import { Badge } from '@/shadcn/ui/badge'
import { Button } from '@/shadcn/ui/button'
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

interface OrderTableProps {
  orders: Order[] | undefined
}

export const OrderTable: FC<OrderTableProps> = ({ orders }) => {
  const isVerySmall = useMediaQuery('(max-width: 900px)')
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
          <TableRow key={item.id}>
            <TableCell>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="font-bold">{item?.uuid}</div>
                  {isVerySmall && (
                    <Badge
                      style={{
                        backgroundColor:
                          item?.status && statusColor(item?.status),
                        color: 'black',
                        textAlign: 'center',
                      }}
                    >
                      {item?.status && translateStatus(item?.status)}
                    </Badge>
                  )}
                </div>
                {isVerySmall && <div>{item?.note}</div>}
              </div>
            </TableCell>
            {!isVerySmall && (
              <TableCell>
                <Badge
                  style={{
                    backgroundColor: item?.status && statusColor(item?.status),
                    color: 'black',
                    textAlign: 'center',
                  }}
                >
                  {item?.status && translateStatus(item?.status)}
                </Badge>
              </TableCell>
            )}
            {!isVerySmall && (
              <TableCell colSpan={isVerySmall ? 2 : 1}>{item?.note}</TableCell>
            )}
            <TableCell>
              {item?.status === Status.Paid && (
                <Button size="icon" variant="link">
                  <ArrowBigDownDash />
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
