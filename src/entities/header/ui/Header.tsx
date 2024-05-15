'use client'

import { useMediaQuery } from '@mui/material'
import Link from 'next/link'

import { Card } from '@/shadcn/ui/card'

import { UserToggle } from '@/src/entities/user'
import { MiniCart, ModeToggle } from '@/src/shared'
import { Menu } from '@/src/shared/ui/Menu'
import { MenuToggle } from '@/src/shared/ui/MenuToggle'

export const Header = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  return (
    <>
      <br className="hidden border-none md:block" />
      <header className="fixed left-0 top-0 z-50 mx-auto flex w-full justify-center gap-2 p-0 md:p-4">
        <Card className="flex w-full items-center justify-between gap-2 rounded-none border-[.7px] bg-white/60 p-3 px-4 backdrop-blur-md md:static md:w-fit md:rounded-xl  md:p-2 dark:bg-stone-950/60 md:dark:bg-stone-800/60">
          <div className="flex items-center">
            <MenuToggle className="mr-2 md:hidden" />
            <Link href="/" className="text-xl font-extrabold md:mx-4">
              Eldani
            </Link>
          </div>
          <Menu className={'hidden md:flex'} />
          <div className="flex gap-2">
            <ModeToggle />
            <MiniCart />
            <UserToggle className="md:hidden" />
          </div>
        </Card>
        <Card className="hidden items-center justify-between gap-2 rounded-none border-[.7px] bg-white/60 px-4 md:static md:flex md:w-fit md:rounded-xl md:p-2 dark:bg-stone-800/60">
          <UserToggle />
        </Card>
      </header>

      <br className="border-none md:hidden" />
      <hr className="mt-3 border-none md:hidden" />
      <hr className="mt-6 border-none md:hidden" />
      <hr className="border-none md:mt-20" />
    </>
  )
}
