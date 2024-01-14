'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import dayLater from '@/lib/dayLater'

const PatternComment = ({
  id,
  content,
  blocked,
  blockedThread,
  blockReason,
  isAdminComment,
  removed,
  approvalStatus,
  createdAt,
  updatedAt,
  gotThread,
  author,
  children,
}: Comment) => {
  return (
    <div className="flex space-x-4">
      <Avatar>
        <AvatarImage src={author.avatar} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center space-x-2 text-xs">
          <p className="text-stone-500 dark:text-stone-300">{author.name}</p>
          <p className="text-muted-foreground font-bold">{dayLater(createdAt)}</p>
        </div>
        <p className="text-sm font-light">{content}</p>
      </div>
    </div>
  )
}

export default PatternComment
