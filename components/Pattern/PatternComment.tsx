'use client'

import React, { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import dayLater from '@/lib/dayLater'

type PatternCommentProps = {
  id: number
  name: string
  comment: string
  avatar: any
  createdAt: string
}

const PatternComment: FC<PatternCommentProps> = ({ id, name, comment, avatar, createdAt }) => {
  return (
    <div className="flex space-x-4">
      <Avatar>
        <AvatarImage src={avatar.src} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground">{dayLater(createdAt)}</p>
        </div>
        <p className="text-sm font-light">{comment}</p>
      </div>
    </div>
  )
}

export default PatternComment
