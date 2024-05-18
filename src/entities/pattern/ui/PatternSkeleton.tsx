import useMediaQuery from '@mui/material/useMediaQuery'

import { Skeleton } from '@/shadcn/ui/skeleton'

import { cn } from '@/src/shared/libs/utils'

export const PatternSkeleton = () => {
  return (
    <>
      <div className="relative md:w-2/5">
        <div className="md:sticky md:top-36">
          <Skeleton className="h-full w-full" />
        </div>
      </div>

      <div className="flex flex-col justify-between px-4 py-4 md:w-3/5 md:px-10 md:pt-10">
        <div>
          <div className="flex items-start justify-between md:flex-col md:gap-4">
            <div>
              <Skeleton className="hidden text-xl font-extrabold md:block md:text-3xl" />
              <Skeleton className="text-3xl font-extrabold md:text-2xl" />
            </div>
            <div
              className={cn(
                'inline-grid grid-flow-col items-center justify-items-center gap-1 p-0 transition',
              )}
            >
              <>
                <Skeleton className="h-5 w-5" />
              </>
            </div>
          </div>
          <hr className="mt-6 border-none" />
          <hr className="mt-4 border-none" />
        </div>
        <div
          className={cn(
            'sticky bottom-0 left-0 -mt-20 hidden h-28 w-full md:block',
            'bg-gradient-to-t from-slate-100 to-transparent dark:from-stone-900',
          )}
        />
      </div>
    </>
  )
}
