'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'

import { dayLater } from '@/src/shared'

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
          <p className="text-stone-500 dark:text-stone-300">{author.name}</p>
          <p className="text-muted-foreground font-bold">
            {dayLater(createdAt)}
            {createdAt !== updatedAt ? (
              <span className="text-muted-foreground text-xs font-light">
                (изменено)
              </span>
            ) : null}
          </p>
        </div>
        <p className="text-sm font-light">{content}</p>
      </div>
    </div>
  )
}
