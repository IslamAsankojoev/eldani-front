'use client'

import Link from 'next/link'

import { Card } from '@/shadcn/ui/card'

import { UserToggle } from '@/src/entities/user'
import { ModeToggle } from '@/src/shared'
import { Menu } from '@/src/shared/ui/Menu'
import { MenuToggle } from '@/src/shared/ui/MenuToggle'

export const Header = () => {
  return (
    <>
      <br className="hidden md:block border-none" />
      <header className="fixed left-0 top-0 z-50 mx-auto flex w-full justify-center gap-2 p-0 md:p-3">
        <Card className="flex w-full items-center justify-between gap-2 rounded-none border-[.7px] bg-white p-3 px-4 md:static md:w-fit md:rounded-xl md:p-2  dark:border-[#303030] dark:bg-[#2f2a2a]">
          <div className='flex items-center'>
          <MenuToggle className="md:hidden" />
            <Link href="/" className="md:mx-4 text-xl font-extrabold">
              Eldani
            </Link>
          </div>
          <Menu className={'hidden md:flex'} />
          <div className="flex gap-2">
            <ModeToggle />
            <UserToggle className='md:hidden'/>
          </div>
        </Card>
        <Card className="hidden items-center justify-between gap-2 rounded-none border-[.7px] bg-white px-4 md:static md:flex md:w-fit md:rounded-xl md:p-2 dark:border-[#303030] dark:bg-[#2f2a2a]">
          <UserToggle />
        </Card>
      </header>

      <br className="md:hidden border-none" />
      <hr className="mt-3 md:hidden border-none" />
      <hr className="mt-6 md:hidden border-none" />
      <hr className="md:mt-20 border-none" />
    </>
  )
}
