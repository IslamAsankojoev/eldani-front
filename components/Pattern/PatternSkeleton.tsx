import { Skeleton } from '@/shadcn/ui/skeleton'

const PatternSkeleton = () => {
  return (
    <div className="flex flex-col items-start gap-2.5">
      <Skeleton className="h-[60vw] md:h-[35vh] w-full rounded-lg" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-5 w-20" />
    </div>
  )
}

export default PatternSkeleton
