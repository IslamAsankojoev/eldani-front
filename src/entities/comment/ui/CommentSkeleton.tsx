import { Skeleton } from '@/shadcn/ui/skeleton'

export const CommentSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-grow space-y-2">
        <Skeleton className="h-4 w-10/12" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}
