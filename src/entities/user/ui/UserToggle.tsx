'use client'

import { useEffect, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import { Button } from '@/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'

import { cn } from '@/src/shared'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LogIn } from 'lucide-react'
import { Skeleton } from '@/shadcn/ui/skeleton'
import { useUser } from '../query'

interface UserToggleProps {
  className?: string
}

type Route = {
  name: string
  href: string
}

export const userToggleRoutes:Route[]= [
  {
    name: 'Профиль',
    href: '/profile',
  },
  {
    name: 'Выйти',
    href: '/api/logout',
  },
]

export const UserToggle = ({ className }: UserToggleProps) => {
  const {data:user, isLoading, refetch} = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleRouteChange = (item:Route) => {
    if (item.href === '/api/logout') {
      router.push(item.href)
      setIsOpen(false)
      return
    }
    router.push(item.href)
    setIsOpen(false)
  }

  useEffect(() => {
    refetch()
  }, [pathname])

  console.log('profile', user)
  if(isLoading){
    return (
      <Skeleton className={
        cn(
          'w-10 h-10 rounded-full',
          className
        )
      }/>
    )
  }

  if(!user) return (
    <Button asChild size='icon' variant='ghost' className={cn(className)}>
      <Link href='/login'>
        <LogIn size={24} />
      </Link>
    </Button>
  )

  return (
    <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn(className,'rounded-full active:scale-110 transition p-2')} ring='none'>
          <Avatar className={cn(className, 'cursor-pointer')}>
            <AvatarImage src={user?.avatar_google} alt="@shadcn" />
            <AvatarFallback>{(user?.username || user?.email)[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user?.username || user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
          <div className='flex flex-col'>
          {userToggleRoutes.map((item) => (
            <Button variant='ghost' className='block text-left' onClick={()=>{handleRouteChange(item)}}>
              {item.name}
            </Button>
          ))}
          </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
