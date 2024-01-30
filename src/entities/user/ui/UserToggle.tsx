'use client'

import { useEffect, useState } from 'react'

import { Avatar, AvatarImage } from '@/shadcn/ui/avatar'
import { Button } from '@/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'

import { cn } from '@/src/shared'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import { UserService } from '..'
import { LogIn } from 'lucide-react'

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
  const {data, refetch} = useQuery('user', ()=>UserService.getMe())
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleRouteChange = (item:Route) => {
    if (item.href === '/logout') {
      router.push('/')
      setIsOpen(false)
      return
    }
    router.push(item.href)
    setIsOpen(false)
  }

  useEffect(() => {
    refetch()
  }, [pathname])

  if(!data) return (
    <Button asChild size='icon' variant='ghost' className={cn(className)}>
      <Link href='https://fc07-77-235-23-216.ngrok-free.app/api/connect/google'>
        <LogIn size={24} />
      </Link>
    </Button>
  )

  return (
    <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn(className)} ring='none'>
          <Avatar className={cn(className, 'cursor-pointer')}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{data?.username}</DropdownMenuLabel>
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
