import { cn } from '@/src/shared/libs/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-slate-300/80 dark:bg-stone-800/80 backdrop-blur-md',
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
