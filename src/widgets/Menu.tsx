'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/shadcn/ui/button'

import { navigationList } from '@/src/app/routes/navigationRoutes'
import { cn } from '@/src/shared/libs/utils'

interface MenuProps {
  className?: string
}

export const Menu = ({ className }: MenuProps) => {
  const pathname = usePathname()

  return (
    <div className={cn('flex items-center justify-between gap-2', className)}>
      {navigationList.map((item) => (
        <Button
          key={item.name}
          asChild
          variant={item.href === pathname ? 'link' : 'link'}
          className={cn(
            'relative text-black dark:text-white',
            item.href === pathname ? 'underline underline-offset-4' : '',
          )}
          style={{ transition: 'all 0.2s ease-in-out' }}
        >
          <Link href={item.href}>{item.name}</Link>
        </Button>
      ))}
    </div>
  )
}
