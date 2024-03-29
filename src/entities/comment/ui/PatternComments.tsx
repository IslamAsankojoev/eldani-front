'use client'

import { useState } from 'react'

import _ from 'lodash'
import { MessageCircle, X } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/ui/dialog'
import { ScrollArea } from '@/shadcn/ui/scroll-area'

import { cn } from '@/src/shared/libs/utils'

import { PatternCardCarousel } from '../../pattern'
import { useUser } from '../../user/query'
import { CommentService } from '../api'
import { CommentInput } from './CommentInput'
import { CommentSkeleton } from './CommentSkeleton'
import { PatternComment } from './PatternComment'
import MuiBottomDrawer from './MuiBottomDrawer'
import useMediaQuery from '@mui/material/useMediaQuery'

export function PatternComments({
  id,
  thumbnails,
}: Pick<Pattern, 'id' | 'thumbnails'> & {
  wrapperComponent?: React.FC
}) {
  const { data: user } = useUser()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { data, refetch, isLoading } = useQuery(
    [CommentService.entity, id],
    () => CommentService.getAll(id),
    {
      enabled: open,
      staleTime: 6 * 1000,
      refetchInterval: 6 * 1000,
      refetchOnMount: true,
    },
  )
  const { mutateAsync, isLoading: mutateLoading } = useMutation(
    (comment: CommentPost) => CommentService.create(id, comment),
    {
      onSuccess: () => {
        refetch()
      },
    },
  )

  const handleSendComment = async (content: string) => {
    queryClient.setQueryData([CommentService.entity, id], (old: any) => {
      const newComment: IComment = {
        id: Math.random(),
        content: content,
        blocked: false,
        blockedThread: false,
        blockReason: null,
        isAdminComment: null,
        removed: false,
        approvalStatus: true,
        createdAt: new Date().toISOString().toString() as string,
        updatedAt: new Date().toISOString().toString() as string,
        gotThread: false,
        author: {
          id: user?.id as number,
          name: user?.username as string,
          email: user?.email as string,
          avatar: user?.avatar_google as string,
        },
        children: [],
      }
      return old.length ? [...old, newComment] : [newComment]
    })

    return mutateAsync(
      {
        author: {
          id: user?.id as number,
          name: user?.username as string,
          email: user?.email as string,
          avatar: user?.avatar_google as string,
        },
        content: content,
      },
      {
        onSuccess: () => {},
      },
    )
  }

  if (isDesktop)
    return (
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="relative m-0 h-auto w-auto border-none bg-transparent p-2 outline-none !ring-transparent transition hover:bg-transparent focus:border-none focus:outline-none active:scale-110"
            >
              <MessageCircle size={23} strokeWidth={1.25} absoluteStrokeWidth />
            </Button>
          </DialogTrigger>
          <DialogContent className="py-3 pl-3 pr-0 md:rounded-[34px]">
            <div className="flex h-[60vh] w-full gap-3 py-2 pl-2">
              <div className="flex h-full flex-grow items-center justify-center">
                <Card className="h-full w-full overflow-hidden rounded-2xl border-none">
                  {thumbnails && (
                    <PatternCardCarousel
                      thumbnails={thumbnails}
                      className="h-full rounded-2xl"
                      prevButtonClassName="!left-2 !flex z-50 !-bottom-2 !top-[initial]"
                      nextButtonClassName="!right-2 !flex z-50 !-bottom-2 !top-[initial]"
                      dotsClassName="!bottom-5"
                    />
                  )}
                </Card>
              </div>
              <div className="flex h-full w-1/5 flex-grow flex-col justify-between gap-2">
                <DialogTitle className="pl-5 text-sm">Комментарии</DialogTitle>
                <ScrollArea className="h-full pr-2">
                  <div
                    className={cn(
                      'flex h-full flex-col gap-4 px-4 py-4',
                      isLoading ? 'py-7' : '',
                    )}
                  >
                    {isLoading ? (
                      <>
                        {Array.from({ length: 7 }).map((_, index) => (
                          <CommentSkeleton key={index} />
                        ))}
                      </>
                    ) : (
                      <>
                        {data?.length ? (
                          // @ts-ignore
                          data?.map((comment: IComment) => (
                            <PatternComment key={comment.id} {...comment} />
                          ))
                        ) : (
                          <p className="text-muted-foreground py-10 text-center text-sm">
                            Комментариев пока нет, будьте первым!
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </ScrollArea>
                <div className="pr-5">
                  <CommentInput
                    handleSendComment={handleSendComment}
                    className="rounded-xl"
                    isLoading={mutateLoading}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )

  return (
    <MuiBottomDrawer
      open={open}
      handleDismiss={() => setOpen(false)}
      handleOpen={() => setOpen(true)}
      header={
        <div className="relative flex items-center justify-center p-3 pt-5">
          Комментарии
        </div>
      }
      footer={
        <CommentInput
          handleSendComment={handleSendComment}
          isLoading={mutateLoading}
        />
      }
    >
      <div className="flex flex-col gap-4 px-4 py-3">
        {isLoading ? (
          <>
            {Array.from({ length: 7 }).map((_, index) => (
              <CommentSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {data?.length ? (
              data?.map((comment: IComment) => (
                <PatternComment key={comment.id} {...comment} />
              ))
            ) : (
              <p className="text-muted-foreground py-10 text-center text-sm">
                Комментариев пока нет, будьте первым!
              </p>
            )}
          </>
        )}
      </div>
    </MuiBottomDrawer>
  )
}
