'use client'
import React, { useEffect } from 'react'

import Link from 'next/link'

import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'
import { Avatar, AvatarImage } from '@/shadcn/ui/avatar'
import { useQueryClient } from 'react-query'

const Login = () => {
  const queryClient = useQueryClient()

  useEffect(()=>{
    queryClient.invalidateQueries('user', {
      exact: true,
    })
  }, [])

  return (
    <div className="flex items-center justify-center">
      <Card className='p-4 flex gap-4 flex-col dark:bg-[#1a1615] bg-white'>
        <h1 className='text-xl text-center'>Вход</h1>
        <Button asChild variant='secondary'>
          <div className='flex gap-2'>
          <Avatar className="w-6 h-6">
            <AvatarImage src='https://cdn-icons-png.flaticon.com/512/300/300221.png' alt="@shadcn" />
          </Avatar>
          <Link href="https://c2ef-77-235-23-216.ngrok-free.app/api/connect/google">
            Войти через Google
          </Link>
          </div>
        </Button>
      </Card>
    </div>
  )
}

export default Login