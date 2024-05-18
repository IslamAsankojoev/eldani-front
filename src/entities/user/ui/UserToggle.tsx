'use client'

import { useState } from 'react'

import { LogIn, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import { Button } from '@/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'
import { Skeleton } from '@/shadcn/ui/skeleton'

import { cn } from '@/src/shared'

import { useUser } from '../query'

interface UserToggleProps {
  className?: string
}

type Route = {
  name: string
  href: string
  icon?: JSX.Element
}

export const userToggleRoutes: Route[] = [
  {
    name: 'Профиль',
    href: '/me/profile',
    icon: <UserRound />,
  },
  {
    name: 'Выйти',
    href: '/api/logout',
    icon: <LogIn />,
  },
]

export const UserToggle = ({ className }: UserToggleProps) => {
  const { data: user, isLoading } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleRouteChange = (item: Route) => {
    if (item.href === '/api/logout') {
      router.push(item.href)
      setIsOpen(false)
      return
    }
    router.push(item.href)
    setIsOpen(false)
  }

  if (isLoading) {
    return <Skeleton className={cn('h-10 w-10 rounded-full', className)} />
  }

  if (!user)
    return (
      <Button asChild size="icon" variant="ghost" className={cn(className)}>
        <Link href="/login">
          <LogIn size={24} />
        </Link>
      </Button>
    )

  return (
    <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            className,
            'rounded-full p-2 transition active:scale-110',
          )}
          ring="none"
        >
          <Avatar className={cn(className, 'cursor-pointer')}>
            <AvatarImage src={user?.avatar_google} alt="@shadcn" />
            <AvatarFallback>
              {(user?.username || user?.email)[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <div className="flex flex-col">
          {userToggleRoutes.map((item) => (
            <Button
              variant="ghost"
              className="flex flex-row justify-start gap-2 p-2 text-left"
              onClick={() => handleRouteChange(item)}
            >
              {item.icon}
              {item.name}
            </Button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
