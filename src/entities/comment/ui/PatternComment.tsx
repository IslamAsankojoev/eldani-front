'use client'

import { Roboto } from 'next/font/google'
import { Trash2, Pencil, EllipsisVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/shadcn/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'

import { cn, dayLater } from '@/src/shared'

const robotoFont = Roboto({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['cyrillic'],
})

interface PatternCommentProps extends IComment {
  handleDelete: (commentId: number, authorId: number) => void
  handleEdit: (commentId:number) => void
}

export const PatternComment = ({
  id,
  content,
  createdAt,
  author,
  updatedAt,
  handleDelete,
  handleEdit,
}: PatternCommentProps) => {
  return (
    <div className="flex space-x-4 justify-between">
      <div className='flex space-x-4'>
      <Avatar>
        <AvatarImage src={author.avatar} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center space-x-2 text-xs">
          <p className="font-semibold text-stone-500 dark:text-stone-400">
            {author.email}
          </p>
          <p className="font-bold text-muted-foreground">
            {dayLater(createdAt)}
            {createdAt !== updatedAt ? (
              <span className="text-xs font-light text-muted-foreground">
                &nbsp;(изменено)
              </span>
            ) : null}
          </p>
        </div>
        <p className={cn('text-sm', robotoFont.className)}>{content}</p>
      </div>
      </div>

      <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='gap-2' onClick={()=>{handleEdit(id)}}><Pencil size={14}/> Изменить</DropdownMenuItem>
        <DropdownMenuItem className='gap-2' onClick={()=>{handleDelete(id, author.id)}}><Trash2 size={14}/> Удалить</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}
