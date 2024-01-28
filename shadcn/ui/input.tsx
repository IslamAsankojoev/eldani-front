import * as React from 'react'

import { cn } from '@/src/shared/libs/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          className,
          type === 'file'
            ? 'inline-block cursor-pointer text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm placeholder:text-muted-foreground file:hover:cursor-pointer hover:file:bg-slate-200 file:dark:bg-stone-800 file:dark:hover:bg-stone-700'
            : 'flex h-10 w-full rounded-md border border-input bg-background bg-slate-100 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-800',
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
