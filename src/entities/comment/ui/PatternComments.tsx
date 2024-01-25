'use client'
import { useEffect, useRef, useState } from 'react'

import _ from 'lodash'
import { useTheme } from 'next-themes'
import { MessageCircle, X } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import colors from 'tailwindcss/colors'
import { Card } from '@/shadcn/ui/card'
import { Button } from '@/shadcn/ui/button'
import { cn } from '@/src/shared/libs/utils'
import { Separator } from '@/shadcn/ui/separator'
import { ScrollArea } from '@/shadcn/ui/scroll-area'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/shadcn/ui/dialog'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerTitle, DrawerTrigger } from '@/shadcn/ui/drawer'

import { CommentService } from '../api'
import { CommentInput } from './CommentInput'
import { PatternComment } from './PatternComment'
import { CommentSkeleton } from './CommentSkeleton'
import { PatternCardCarousel } from '../../pattern'

export const PatternComments = ({ id, thumbnails }: Pick<Pattern, 'id' | 'thumbnails'>) => {
  const { theme } = useTheme()
  const queryClient = useQueryClient()
  const closeRef = useRef<null | HTMLButtonElement>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [openDesktop, setOpenDesktop] = useState(false)
  const navigator = typeof window !== 'undefined' && (window.navigator as Navigator)
  const viewport = localStorage.getItem('viewport')
  const my_avatar = 'https://loremflickr.com/320/240/boy'

  const { data, refetch, isLoading } = useQuery(
    [CommentService.entity, id],
    () => CommentService.getAll(id),
    {
      enabled: open || openDesktop,
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

  const dismissible =
    typeof window !== 'undefined' && navigator
      ? !(navigator as Navigator).userAgent.toLowerCase().includes('android')
      : false

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
          id: 1,
          name: 'Kama',
          email: 'kama@mail.ru',
          avatar: my_avatar,
        },
        children: [],
      }
      return old.length ? [...old, newComment] : [newComment]
    })

    return mutateAsync(
      {
        author: {
          id: 1,
          name: 'Kama',
          email: 'kama@mail.ru',
          avatar: my_avatar,
        },
        content: content,
      },
      {
        onSuccess: () => {},
      },
    )
  }

  const handleRemoveModal = () => {
    router.replace(pathname, {
      scroll: false,
    })
  }

  useEffect(() => {
    if (open) {
      router.push(`${pathname}?modal=comments`, {
        scroll: false,
      })
      refetch()
    }
  }, [open, router, pathname, refetch])

  useEffect(() => {
    if (searchParams.get('modal') !== 'comments') {
      closeRef.current && closeRef.current.click()
    }
  }, [searchParams])

  if (viewport === 'desktop')
    return (
      <Dialog open={openDesktop} onOpenChange={setOpenDesktop}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="h-auto w-auto p-0 m-0 bg-transparent hover:bg-transparent border-none focus:border-none outline-none focus:outline-none active:scale-110 transition relative !ring-transparent"
          >
            <MessageCircle size={23} strokeWidth={1.25} absoluteStrokeWidth />
          </Button>
        </DialogTrigger>
        <DialogContent className="py-3 pl-3 pr-0 md:rounded-[34px]">
          <div className="flex w-full gap-3 py-2 pl-2">
            <div className="flex-grow">
              <Card className="rounded-2xl overflow-hidden border-none">
                {thumbnails && (
                  <PatternCardCarousel
                    thumbnails={thumbnails}
                    className="md:h-[60vh] rounded-2xl"
                    prevButtonClassName='!left-2 !flex z-50 !-bottom-2 !top-[initial]'
                    nextButtonClassName='!right-2 !flex z-50 !-bottom-2 !top-[initial]'
                    dotsClassName='!bottom-5'
                  />
                )}
              </Card>
            </div>
            <div className="flex-grow w-1/5 flex flex-col justify-between gap-2">
              <div>
                <DialogTitle className="pl-5 text-sm">Comments</DialogTitle>
                <ScrollArea className="md:h-[50vh] pr-2">
                  <div className={cn('flex px-4 py-4 flex-col gap-4', isLoading ? 'py-7' : '')}>
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
                          <p className="text-center text-sm text-muted-foreground py-10">
                            No comments yet
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </ScrollArea>
              </div>
              <div className="pr-5">
                <CommentInput
                  handleSendComment={handleSendComment}
                  avatar={my_avatar}
                  className="rounded-xl"
                  isLoading={mutateLoading}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer
      dismissible={dismissible}
      onOpenChange={(open) => {
        setOpen(open)
      }}
      onClose={handleRemoveModal}
    >
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto w-auto p-0 m-0 bg-transparent hover:bg-transparent border-none focus:border-none outline-none focus:outline-none active:scale-110 transition relative !ring-transparent"
        >
          <MessageCircle size={23} strokeWidth={1.25} absoluteStrokeWidth />
        </Button>
      </DrawerTrigger>
      <DrawerOverlay
        onClick={() => {
          closeRef.current && closeRef.current.click()
        }}
      />
      <DrawerContent>
        <div className="w-full">
          <DrawerHeader>
            <div className="relative flex justify-center items-center">
              <DrawerTitle>Comments</DrawerTitle>
              <DrawerClose asChild>
                <Button
                  ref={closeRef}
                  className="absolute right-2 p-0 m-0 h-auto hover:bg-transparent bg-transparent"
                >
                  <X color={theme === 'dark' ? colors.stone[200] : colors.stone[500]} />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <Separator />
          <ScrollArea className="h-[600px] !max-h-[40vh]">
            <div className="flex px-4 py-3 flex-col gap-4">
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
                    <p className="text-center text-sm text-muted-foreground py-10">
                      No comments yet
                    </p>
                  )}
                </>
              )}
            </div>
          </ScrollArea>
          <DrawerFooter>
            <CommentInput handleSendComment={handleSendComment} avatar={my_avatar} />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
