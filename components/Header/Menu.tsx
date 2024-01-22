'use client'
import { Button } from '@/shadcn/ui/button'
import Link from 'next/link'
import { ModeToggle } from '../ModeToggle'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Card } from '@/shadcn/ui/card'

const navigationList = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contacts', href: '/contacts' },
]

const Menu = () => {
  const pathname = usePathname()
  const { theme } = useTheme()
  return (
    <header>
      <br className="hidden md:block" />
      <Card
        className="
      dark:bg-[#2f2a2a]
      bg-white
      md:static 
      fixed 
      top-0 
      z-50
      left-0 
      mx-auto 
      w-full 
      md:w-fit 
      flex 
      justify-between
      items-center
      md:p-2
      p-3 
      px-4
      gap-2
      md:rounded-xl
      rounded-none
      dark:border-[#303030]
      border-[.7px]
      "
      >
        <div className="flex justify-between items-center gap-2">
          {navigationList.map((item) => (
            <Button key={item.name} asChild variant={item.href === pathname ? 'default' : 'ghost'}>
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </div>
        <div>
          <ModeToggle />
        </div>
      </Card>
      {/* <br className='md:hidden'/> */}
      <hr className="md:hidden mt-3" />
      <hr className="md:hidden mt-6" />
      <hr className="md:hidden mt-6" />
    </header>
  )
}

export default Menu
