'use client'

import React, { useEffect } from 'react'

import Link from 'next/link'
import { useQueryClient } from 'react-query'

import { Avatar, AvatarImage } from '@/shadcn/ui/avatar'
import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'

import { useUser } from '@/src/entities/user/query'

const loginUrl = `${process.env.API_URL}/api/connect/google`

const Login = () => {
  const { data: user } = useUser()

  return (
    <div className="flex items-center justify-center">
      <Card className="flex flex-col gap-4 border-0 bg-white p-4 dark:bg-stone-950/60">
        <h1 className="text-center text-xl">Вход</h1>
        <Button asChild variant="secondary" className="flex gap-2">
          <Link href={loginUrl}>
            <Avatar className="h-6 w-6">
              <AvatarImage
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                alt="@shadcn"
              />
            </Avatar>{' '}
            Войти через Google
          </Link>
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          в данный момент доступен вход <br /> только через Google
        </p>
      </Card>
    </div>
  )
}

export default Login
