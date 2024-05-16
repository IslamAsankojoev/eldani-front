import { useEffect, useState } from 'react'

import { useMediaQuery } from '@mui/material'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useQuery } from 'react-query'

import { Button } from '@/shadcn/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/shadcn/ui/sheet'

import { PageService } from '@/src/entities/page'

import {
  navigationList,
  policyNavigationList,
} from '../constants/navMenuRoutes'
import { cn } from '../libs/utils'

interface MenuToggleProps {
  className?: string
}

export function MenuToggle({ className }: MenuToggleProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isVerySmall = useMediaQuery('(max-width: 440px)')
  const { data: pages } = useQuery([PageService.entity], () =>
    PageService.find(),
  )

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
      <SheetContent
        className="border-none bg-white/90 backdrop-blur-md dark:bg-stone-950/60"
        side="left"
      >
        <div
          className={cn('h-full pb-20 pt-10', isVerySmall ? 'px-1' : 'px-6')}
        >
          <Link href="/" className="text-xl font-extrabold">
            Eldani
          </Link>
          <br />
          <br />
          <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col">
              {navigationList.map((item) => (
                <Button
                  key={item.name}
                  asChild
                  variant="link"
                  className={cn(
                    'justify-start p-0 text-left text-lg text-black dark:text-white',
                    item.href === pathname
                      ? 'underline underline-offset-4'
                      : '',
                  )}
                >
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
            </div>
            <div className={cn('flex flex-col')}>
              <Button
                asChild
                variant="link"
                className={cn(
                  'justify-start p-0 text-left text-base text-black dark:text-white',
                  isVerySmall ? 'h-8 text-sm' : 'text-base',
                  `/faq` === pathname ? 'underline underline-offset-4' : '',
                )}
              >
                <Link href={`/faq`}>Вопросы и ответы</Link>
              </Button>
              {pages?.map((item) => (
                <Button
                  key={item.id}
                  asChild
                  variant="link"
                  className={cn(
                    'justify-start p-0 text-left text-base text-black dark:text-white',
                    isVerySmall ? 'h-8 text-sm' : 'text-base',
                    `/policy/${item.slug}` === pathname
                      ? 'underline underline-offset-4'
                      : '',
                  )}
                >
                  <Link href={`/policy/${item.slug}`}>{item.title}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
