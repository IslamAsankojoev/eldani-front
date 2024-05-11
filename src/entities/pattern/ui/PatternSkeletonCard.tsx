import { Skeleton } from '@/shadcn/ui/skeleton'

export const PatternSkeletonCard = () => {
  return (
    <div className="flex flex-col items-start gap-2.5">
      <Skeleton className="h-[60vw] w-full rounded-lg md:h-[40vh]" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-5 w-20" />
    </div>
  )
}
