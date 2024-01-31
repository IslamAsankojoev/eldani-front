import { Card } from '@/shadcn/ui/card'
import { Skeleton } from '@/shadcn/ui/skeleton'

const Loading = () => {
  return (
    <div className="flex justify-center">
      <Card className="flex items-center space-x-4 p-4 dark:bg-[#1a1615] bg-white">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[175px]" />
        </div>
      </Card>
    </div>
  )
}

export default Loading
