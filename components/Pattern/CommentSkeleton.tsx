import { Skeleton } from '@/shadcn/ui/skeleton'

const CommentSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
    </div>
  )
}

export default CommentSkeleton
