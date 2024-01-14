import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import avatar1 from '/public/images/avatar1.jpg'
import { Button } from '@/shadcn/ui/button'
import { SendHorizonal } from 'lucide-react'
import { cn } from '@/lib/utils'
import TextareaAutosize from 'react-textarea-autosize'
import { useTheme } from 'next-themes'
import colors from 'tailwindcss/colors'

const CommentInput = ({
  handleSendComment,
  avatar,
}: {
  handleSendComment: any
  avatar: string
}) => {
  const { theme } = useTheme()
  const ref = useRef<HTMLTextAreaElement>(null)
  const [comment, setComment] = useState('')

  const handleType = (e: any) => {
    setComment(e.target.value)
  }

  const handleSend = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    handleSendComment(comment).then(() => {
      setComment('')
      ref.current?.focus()
    })
  }
  console.log(avatar)
  return (
    <div className="flex items-center p-2 gap-2 bg-stone-100 dark:bg-stone-800">
      <Avatar className="mx-2 self-start">
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
            'flex-1 bg-transparent outline-none focus:outline-none dark:placeholder-stone-400 dark:bg-stone-800 resize-none',
          )}
        />
        <Button variant="ghost" className="self-end" type="submit">
          <SendHorizonal
            size={25}
            color={theme === 'dark' ? colors.stone[200] : colors.stone[500]}
          />
        </Button>
      </form>
    </div>
  )
}

export default CommentInput
