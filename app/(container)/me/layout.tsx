'use client'

import useMediaQuery from '@mui/material/useMediaQuery'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'

import { useUser } from '@/src/entities/user/query'
import { profileNavigationList } from '@/src/shared/constants/navMenuRoutes'
import { cn } from '@/src/shared/libs/utils'

import '../../globals.css'

export interface ProfileLayoutProps {
  children: React.ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const { data: user } = useUser()
  const router = useRouter()
  const isSmall = useMediaQuery('(max-width: 640px)')

  const onLogout = () => {
    router.push('/api/logout')
  }

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
            <Card className="space-4 flex flex-col items-center gap-4 border-0 bg-white p-2 dark:bg-stone-950/60">
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
            <div
              className={cn(
                'grid grid-cols-2 gap-2 md:grid-cols-1',
                isSmall ? 'gap-2' : 'gap-2',
              )}
            >
              {profileNavigationList.map((link) => {
                return (
                  <Button
                    className="w-full dark:bg-stone-950/60 dark:hover:bg-stone-950/90"
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
