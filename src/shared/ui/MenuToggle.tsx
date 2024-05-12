import { useEffect, useState } from 'react'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/shadcn/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/shadcn/ui/sheet'

import { navigationList, policyNavigationList } from '../constants/navMenuRoutes'
import { cn } from '../libs/utils'

interface MenuToggleProps {
  className?: string
}

export function MenuToggle({ className }: MenuToggleProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <Sheet onOpenChange={handleOpenChange} open={isOpen} defaultOpen={isOpen} >
      <SheetTrigger asChild className="relative">
        <Button variant="ghost" size="icon" className={className}>
          {isOpen ? <SheetClose /> : <Menu />}
        </Button>
      </SheetTrigger>
      <SheetContent className="border-none bg-white/90 dark:bg-stone-950/60 backdrop-blur-md" side='left'>
        <div className="px-6 pt-10 pb-20 h-full">
          <Link href="/" className="text-xl font-extrabold">
            Eldani
          </Link>
          <br />
          <br />
          <div className='flex flex-col justify-between h-full'>
          <div className="flex flex-col">
            {navigationList.map((item) => (
              <Button
                key={item.name}
                asChild
                variant="link"
                className={cn(
                  'justify-start p-0 text-left text-lg text-black dark:text-white',
                  item.href === pathname ? 'underline underline-offset-4' : '',
                )}
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </div>
          <div className="flex flex-col">
            {policyNavigationList.map((item) => (
              <Button
                key={item.name}
                asChild
                variant="link"
                className={cn(
                  'justify-start p-0 text-left text-base text-black dark:text-white',
                  item.href === pathname ? 'underline underline-offset-4' : '',
                )}
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </div>

          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
