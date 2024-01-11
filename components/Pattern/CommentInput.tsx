import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import avatar1 from '/public/images/avatar1.jpg'
import { Button } from '@/shadcn/ui/button'
import { SendHorizonal } from 'lucide-react'
import { cn } from '@/lib/utils'

// const rowsHeight = {
//   '2'
// }

const CommentInput = () => {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [comment, setComment] = useState('')
  const [rows, setRows] = useState(1)

  const handleType = (e: any) => {
    setComment(e.target.value)
  }

  const handleSend = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    setComment('')
    ref.current?.focus()
  }
  return (
    <div className="flex items-center p-2 gap-2 bg-stone-100 dark:bg-stone-800">
      <Avatar className="mx-2">
        <AvatarImage src={avatar1.src} className="rounded-full border-[1px] border-stone-300" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <form className="flex items-center gap-2 justify-between w-full" onSubmit={handleSend}>
        <textarea
          rows={rows}
          ref={ref}
          placeholder="Write a comment..."
          value={comment}
          onChange={handleType}
          className={cn(
            "flex-1 bg-transparent outline-none focus:outline-none dark:placeholder-stone-400 dark:bg-stone-800 resize-none text-nowrap",
          )}
        />
        <Button variant="ghost" type="submit">
          <SendHorizonal size={25} />
        </Button>
      </form>
    </div>
  )
}

export default CommentInput
