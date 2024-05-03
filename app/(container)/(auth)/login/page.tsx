'use client'

import React, { useEffect } from 'react'

import Link from 'next/link'
import { useQueryClient } from 'react-query'

import { Avatar, AvatarImage } from '@/shadcn/ui/avatar'
import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'

const loginUrl = 'http://localhost:8000/api/connect/google'

const Login = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries('user', {
      exact: true,
    })
  }, [])

  return (
    <div className="flex items-center justify-center">
      <Card className="flex flex-col gap-4 bg-white p-4 dark:bg-[#1a1615]">
        <h1 className="text-center text-xl">Вход</h1>
        <Button asChild variant="secondary">
          <div className="flex gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                alt="@shadcn"
              />
            </Avatar>
            <Link href={loginUrl}>Войти через Google</Link>
          </div>
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          в данный момент доступен вход <br /> только через Google
        </p>
      </Card>
    </div>
  )
}

export default Login
