import { Card } from '@/shadcn/ui/card'
import { Skeleton } from '@/shadcn/ui/skeleton'

const Loading = () => {
  return (
    <div className="flex justify-center">
      <Card className="dark:bg-stone-920 flex items-center space-x-4 bg-white p-4">
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
