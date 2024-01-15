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
      <br className='hidden md:block'/>
      <Card
        className="
      dark:bg-[#252221]
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
      "
        style={{
          boxShadow:
            theme === 'dark'
              ? '0 0 2rem -14px rgba(255, 255, 255, 0.25)'
              : '0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.05)',
          border: theme === 'dark' ? '0.5px solid rgb(49 49 49)' : '1px solid #eaeaea',
        }}
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
      <br className='md:hidden'/>
      <br className='md:hidden'/>
      <br className='md:hidden'/>
    </header>
  )
}

export default Menu
