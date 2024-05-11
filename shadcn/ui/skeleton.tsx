import { cn } from '@/src/shared/libs/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-slate-300 dark:bg-stone-800',
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
