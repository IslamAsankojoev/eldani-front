'use client'

import { SyntheticEvent, useEffect, useRef, useState } from 'react'

import { Loader, Loader2, SendHorizonal } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import TextareaAutosize from 'react-textarea-autosize'
import colors from 'tailwindcss/colors'

import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import { Button } from '@/shadcn/ui/button'

import { cn } from '@/src/shared/libs/utils'

import { useUser } from '../../user/query'

export const CommentInput = ({
  handleSendComment,
  className,
  classNameInput,
  handleChange, 
  value,
}: {
  handleSendComment: any
  className?: string
  classNameInput?: string
  isLoading?: boolean
  handleChange?: any
  value?: string
}) => {
  const { data: user } = useUser()
  const { theme } = useTheme()
  const ref = useRef<HTMLTextAreaElement>(null)

  const handleType = (e: any) => {
    handleChange(e.target.value)
  }

  const handleSend = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    if (!value) return null
    try {
      handleSendComment(value)
      handleChange('')
      ref.current?.focus()
    } catch (error) {
      console.error(error)
    }
  }
  if (!user)
    return (
      <div className="bg-stone-100 p-2 md:rounded-xl dark:bg-stone-800">
        <p className="text-center text-sm text-stone-500 dark:text-stone-400">
          <Button asChild variant="link" className="p-0">
            <Link href="/login">Войдите</Link>
          </Button>{' '}
          - чтобы оставить комментарий
        </p>
      </div>
    )

  return (
    <div
      className={cn(
        'relative flex w-full items-center gap-2 bg-stone-100 p-2 dark:bg-stone-800',
        className,
      )}
    >
      <Avatar className="mr-2 self-start">
        <AvatarImage
          src={user?.avatar_google}
          className="rounded-full border-2 border-stone-300"
        />
        <AvatarFallback>
          {(user?.username || user?.email)?.toUpperCase()[0]}
        </AvatarFallback>
      </Avatar>
      <form
        className="flex w-full items-center justify-between gap-2"
        onSubmit={handleSend}
      >
        <TextareaAutosize
          maxRows={10}
          ref={ref}
          placeholder="Оставьте комментарий ..."
          value={value}
          onChange={handleType}
          className={cn(
            'flex-1 resize-none bg-transparent font-normal outline-none focus:outline-none dark:bg-stone-800 dark:placeholder-stone-400',
            classNameInput,
          )}
        />
        {!!value ? (
          <Button variant="ghost" className="self-end" type="submit">
              <SendHorizonal
                size={25}
                color={theme === 'dark' ? colors.stone[100] : colors.stone[700]}
              />
          </Button>
        ) : null}
      </form>
    </div>
  )
}
