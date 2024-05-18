'use client'

import useMediaQuery from '@mui/material/useMediaQuery'
import { usePathname, useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'

import { profileNavigationList } from '@/src/app/routes/navigationRoutes'
import { useUser } from '@/src/entities/user/query'
import { cn } from '@/src/shared/libs/utils'

import '../../globals.css'

export interface ProfileLayoutProps {
  children: React.ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const { data: user } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const isSmall = useMediaQuery('(max-width: 640px)')

  return (
    <>
      <div className={cn(' flex h-full flex-col justify-center py-6 md:p-0')}>
        <div className="relative flex h-full flex-col gap-4 md:flex-row">
          <div
            className={cn(
              'flex flex-grow-0 flex-col ',
              isSmall ? 'w-full gap-2' : 'sticky top-64 w-96 gap-2',
            )}
          >
            <div>
              <h1 className="hidden p-4 pt-2 text-2xl font-bold md:block">
                Меню
              </h1>
              <Card className="flex flex-col items-center gap-4 border-0 bg-white p-2 dark:bg-stone-950/60">
                <div className="flex w-full justify-between">
                  <div className="flex gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user?.avatar_google} alt="@shadcn" />
                      <AvatarFallback>
                        {user?.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0">
                      <p className="text-base font-bold">{user?.username}</p>
                      <p className="text-sm">{user?.email}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div
              className={cn(
                'grid grid-cols-2 gap-2 md:grid-cols-1',
                isSmall ? 'gap-2' : 'gap-2',
              )}
            >
              {profileNavigationList.map((link) => {
                return (
                  <Button
                    className={cn(
                      'flex w-full bg-white hover:bg-white dark:bg-stone-950/60 dark:hover:bg-stone-950',
                      link.href === '/api/logout' ? 'text-rose-500' : '',
                      link.href === pathname
                        ? 'pointer-events-none bg-rose-500 text-white dark:bg-rose-700'
                        : '',
                      isSmall ? 'justify-center' : 'justify-start',
                    )}
                    variant="ghost"
                    onClick={() => router.push(link.href)}
                  >
                    <link.icon className="mr-2 h-5 w-5" /> {link.name}
                  </Button>
                )
              })}
            </div>
          </div>
          <div className="w-full flex-grow">{children}</div>
        </div>
      </div>
    </>
  )
}
