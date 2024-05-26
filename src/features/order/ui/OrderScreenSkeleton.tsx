import _ from 'lodash'

import { Card } from '@/shadcn/ui/card'
import { Skeleton } from '@/shadcn/ui/skeleton'

export const OrderScreenSkeleton = () => {
  return (
    <Card className="mt-2 flex flex-col gap-6 border-none p-4 dark:bg-stone-950/60">
      <Skeleton className="h-6 w-1/2" />
      {_.times(4, (item) => (
        <Skeleton className="h-8" />
      ))}
    </Card>
  )
}
