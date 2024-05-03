'use client'

import { Roboto } from 'next/font/google'

import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'

import { cn, dayLater } from '@/src/shared'

const robotoFont = Roboto({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['cyrillic'],
})

export const PatternComment = ({
  content,
  createdAt,
  author,
  updatedAt,
}: IComment) => {
  return (
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
  )
}
