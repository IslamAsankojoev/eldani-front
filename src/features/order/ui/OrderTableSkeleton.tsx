import _ from 'lodash'

import { Skeleton } from '@/shadcn/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/shadcn/ui/table'

export const OrderTableSkeleton = () => {
  return (
    <TableBody>
      {_.times(4, (item) => (
        <TableRow>
          <TableCell colSpan={4}>
            <Skeleton className="h-5 w-full" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
