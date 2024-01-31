'use client'

import { SyntheticEvent, useEffect, useRef, useState } from 'react'

import { Loader, Loader2, SendHorizonal } from 'lucide-react'
import { useTheme } from 'next-themes'
import TextareaAutosize from 'react-textarea-autosize'
import colors from 'tailwindcss/colors'

import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import { Button } from '@/shadcn/ui/button'

import { cn } from '@/src/shared/libs/utils'

export const CommentInput = ({
  handleSendComment,
  avatar,
  className,
  classNameInput,
}: {
  handleSendComment: any
  avatar: string
  className?: string
  classNameInput?: string
  isLoading?: boolean
}) => {
  const { theme } = useTheme()
  const ref = useRef<HTMLTextAreaElement>(null)
  const [comment, setComment] = useState('')

  const handleType = (e: any) => {
    setComment(e.target.value)
  }

  const handleSend = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    if (!comment.length) return null
    try {
      handleSendComment(comment)
      setComment('')
      ref.current?.focus()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div
      className={cn(
        'relative flex w-full items-center gap-2 bg-stone-100 p-2 dark:bg-stone-800',
        className,
      )}
    >
      <Avatar className="mr-2 self-start">
        <AvatarImage
          src={avatar}
          className="rounded-full border-2 border-stone-300"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <form
        className="flex w-full items-center justify-between gap-2"
        onSubmit={handleSend}
      >
        <TextareaAutosize
          maxRows={3}
          ref={ref}
          placeholder="Оставьте комментарий ..."
          value={comment}
          onChange={handleType}
          className={cn(
            'flex-1 resize-none bg-transparent font-normal outline-none focus:outline-none dark:bg-stone-800 dark:placeholder-stone-400',
            classNameInput,
          )}
        />
        {comment.length ? (
          <Button
            variant="ghost"
            className="absolute bottom-2 right-0 translate-y-2 self-end"
            type="submit"
          >
            {false ? (
              <Loader2
                size={25}
                color={theme === 'dark' ? colors.stone[200] : colors.stone[700]}
                className="animate-spin"
              />
            ) : (
              <SendHorizonal
                size={25}
                color={theme === 'dark' ? colors.stone[200] : colors.stone[700]}
              />
            )}
          </Button>
        ) : null}
      </form>
    </div>
  )
}
