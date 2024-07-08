'use client'

import useMediaQuery from '@mui/material/useMediaQuery'
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react'
import { Roboto } from 'next/font/google'

import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/shadcn/ui/context-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'

import { cn, dayLater } from '@/src/shared'

import { useUser } from '../../user/query'

const robotoFont = Roboto({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['cyrillic'],
})

interface PatternCommentProps extends IComment {
  handleDelete: (commentId: number, authorId: number) => void
  handleEdit: (commentId: number) => void
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
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { data: user } = useUser()
  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className={cn(
              'bg-slate-920 flex justify-between space-x-4 ',
              isDesktop ? '' : 'p-4 hover:bg-slate-100 hover:dark:bg-stone-950',
            )}
          >
            <div className="flex space-x-4">
              <Avatar>
                <AvatarImage src={author.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2 text-xs">
                  <p className="font-semibold text-stone-500 dark:text-stone-400">
                    {author.email}
                  </p>
                  <p className="text-muted-foreground">
                    {dayLater(createdAt as string)}
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
            {Number(user?.id) === Number(author.id) && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="gap-2"
                    onClick={() => {
                      handleEdit(id as number)
                    }}
                  >
                    <Pencil size={14} /> Изменить
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="gap-2"
                    onClick={() => {
                      handleDelete(id as number, author.id)
                    }}
                  >
                    <Trash2 size={14} /> Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </ContextMenuTrigger>
        {Number(user?.id) === Number(author.id) && (
          <ContextMenuContent>
            <ContextMenuItem
              onClick={() => {
                handleEdit(id as number)
              }}
            >
              Изменить
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => {
                handleDelete(id as number, author.id)
              }}
            >
              Удалить
            </ContextMenuItem>
          </ContextMenuContent>
        )}
      </ContextMenu>
    </div>
  )
}
