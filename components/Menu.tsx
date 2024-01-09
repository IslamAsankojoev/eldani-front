'use client'
import { Button } from '@/shadcn/ui/button'
import Link from 'next/link'
import { ModeToggle } from './ModeToggle'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

const navigationList = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const Menu = () => {
  const pathname = usePathname()
  const { theme } = useTheme()
  return (
    <>
      <header
        className="
      dark:bg-[#262322]
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
      md:rounded-xl"
        style={{
          boxShadow:
            theme === 'dark'
              ? '0 0 0.1rem 0.05rem rgba(255, 255, 255, 0.25)'
              : '0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.05)',
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
      </header>
      <br />
      <br />
      <br />
    </>
  )
}

export default Menu
