import * as React from 'react'

import { cn } from '@/src/shared/libs/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-500 outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-stone-100 dark:placeholder:text-stone-400 dark:bg-stone-800',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
