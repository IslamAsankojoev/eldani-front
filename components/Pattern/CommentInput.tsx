import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import avatar1 from '/public/images/avatar1.jpg'
import { Button } from '@/shadcn/ui/button'
import { SendHorizonal } from 'lucide-react'

const CommentInput = () => {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [comment, setComment] = useState('')

  const handleSend = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    setComment('')
    ref.current?.focus()
  }

  // if you want to focus on the input when the modal opens uncomment this
  // useEffect(() => {
  //   ref.current?.focus()
  // }, [])

  return (
    <div className="flex items-center p-2 gap-2 bg-stone-100 dark:bg-stone-800">
      <Avatar className="mx-2">
        <AvatarImage src={avatar1.src} className="rounded-full border-[1px] border-stone-300" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <form className="flex items-center gap-2 justify-between w-full" onSubmit={handleSend}>
        <textarea
          rows={1}
          ref={ref}
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 bg-transparent outline-none focus:outline-none dark:placeholder-stone-400 dark:bg-stone-800 resize-none"
        />
        <Button variant="ghost" type="submit">
          <SendHorizonal size={25} />
        </Button>
      </form>
    </div>
  )
}

export default CommentInput
