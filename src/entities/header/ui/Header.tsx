'use client'

import Link from 'next/link'

import { Card } from '@/shadcn/ui/card'

import { ModeToggle } from '@/src/shared'
import { Menu } from '@/src/shared/ui/Menu'
import { MenuToggle } from '@/src/shared/ui/MenuToggle'

export const Header = () => {
  return (
    <header>
      <br className="hidden md:block" />
      <Card className="fixed left-0 top-0 z-50 mx-auto flex w-full items-center justify-between gap-2 rounded-none border-[.7px] bg-white p-3 px-4 md:static md:w-fit md:rounded-xl md:p-2 dark:border-[#303030] dark:bg-[#2f2a2a]">
        <Link href="/" className="mx-4 text-xl font-extrabold">
          Eldani
        </Link>
        <Menu className={'hidden md:flex'} />
        <div className="flex">
          <ModeToggle />
          <MenuToggle className="md:hidden" />
        </div>
      </Card>
      <br className="md:hidden" />
      <hr className="mt-3 md:hidden" />
      <hr className="mt-6 md:hidden" />
      {/* <hr className="mt-6 md:hidden" /> */}
    </header>
  )
}
