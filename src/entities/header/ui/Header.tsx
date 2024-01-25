'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'

import { ModeToggle } from '@/src/shared'

const navigationList = [
  { name: 'Home', href: '/' },
  { name: 'Make order', href: '/make-order' },
  { name: 'About', href: '/about' },
  { name: 'Contacts', href: '/contacts' },
]

export const Header = () => {
  const pathname = usePathname()
  return (
    <header>
      <br className="hidden md:block" />
      <Card
        className="
      fixed
      left-0
      top-0 
      z-50 
      mx-auto 
      flex
      w-full 
      items-center 
      justify-between 
      gap-2 
      rounded-none 
      border-[.7px]
      bg-white
      p-3
      px-4 
      md:static
      md:w-fit
      md:rounded-xl
      md:p-2
      dark:border-[#303030]
      dark:bg-[#2f2a2a]
      "
      >
        <div className="flex items-center justify-between gap-2">
          {navigationList.map((item) => (
            <Button
              key={item.name}
              asChild
              variant={item.href === pathname ? 'default' : 'ghost'}
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </div>
        <div>
          <ModeToggle />
        </div>
      </Card>
      <br className="md:hidden" />
      <hr className="mt-3 md:hidden" />
      <hr className="mt-6 md:hidden" />
      {/* <hr className="mt-6 md:hidden" /> */}
    </header>
  )
}
