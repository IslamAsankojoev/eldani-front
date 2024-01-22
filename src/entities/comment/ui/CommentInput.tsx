import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import avatar1 from '/public/images/avatar1.jpg'
import { Button } from '@/shadcn/ui/button'
import { Loader, Loader2, SendHorizonal } from 'lucide-react'
import { cn } from '@/src/shared/libs/utils'
import TextareaAutosize from 'react-textarea-autosize'
import { useTheme } from 'next-themes'
import colors from 'tailwindcss/colors'

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
      className={cn('flex items-center w-full p-2 gap-2 bg-stone-100 dark:bg-stone-800', className)}
    >
      <Avatar className="mr-2 self-start">
        <AvatarImage src={avatar} className="rounded-full border-[1px] border-stone-300" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <form className="flex items-center gap-2 justify-between w-full" onSubmit={handleSend}>
        <TextareaAutosize
          ref={ref}
          placeholder="Write a comment..."
          value={comment}
          onChange={handleType}
          className={cn(
            'flex-1 bg-transparent outline-none focus:outline-none dark:placeholder-stone-400 dark:bg-stone-800 resize-none font-normal',
            classNameInput,
          )}
        />
        {comment.length ? (
          <Button variant="ghost" className="self-end" type="submit">
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