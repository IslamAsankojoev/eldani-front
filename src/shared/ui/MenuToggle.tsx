import { useEffect, useState } from 'react'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/shadcn/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shadcn/ui/sheet'

import { navigationList } from '../constants/navMenuRoutes'
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
    <Sheet onOpenChange={handleOpenChange} open={isOpen} defaultOpen={isOpen}>
      <SheetTrigger asChild className="relative">
        <Button variant="ghost" size="icon" className={className}>
          {isOpen ? <SheetClose /> : <Menu />}
        </Button>
      </SheetTrigger>
      <SheetContent className="border-none bg-white/95 dark:bg-stone-900/95">
        <div className="px-6">
          <Link href="/" className="text-xl font-extrabold">
            Eldani
          </Link>
          <br />
          <br />
          <div className="flex flex-col">
            {navigationList.map((item) => (
              <Button
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
        </div>
      </SheetContent>
    </Sheet>
  )
}
