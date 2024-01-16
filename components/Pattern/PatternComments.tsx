'use client'
import { Button } from '@/shadcn/ui/button'
import { Separator } from '@/shadcn/ui/separator'
import { ScrollArea } from '@/shadcn/ui/scroll-area'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from '@/shadcn/ui/drawer'
import { MessageCircle, X } from 'lucide-react'
import PatternComment from './PatternComment'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTheme } from 'next-themes'
import colors from 'tailwindcss/colors'
import CommentInput from './CommentInput'
import { CommentService } from '@/service/comment.service'
import { useMutation, useQuery } from 'react-query'
import { useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import CommentSkeleton from './CommentSkeleton'

const PatternComments = ({ id }: { id: number }) => {
  const { data, refetch, isLoading } = useQuery(
    [CommentService.entity, id],
    () => CommentService.getAll(id),
    {
      cacheTime: 0,
      staleTime: 0,
      refetchOnMount: true,
    },
  )
  const { mutateAsync } = useMutation((comment: CommentPost) => CommentService.create(id, comment))
  const navigator = typeof window !== 'undefined' && (window.navigator as Navigator)
  const dismissible =
    typeof window !== 'undefined' && navigator
      ? !(navigator as Navigator).userAgent.toLowerCase().includes('android')
      : false
  const { theme } = useTheme()
  const closeRef = useRef<null | HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const my_avatar = _.shuffle([
    'https://loremflickr.com/320/240/boy',
    'https://loremflickr.com/320/240/girl',
    'https://loremflickr.com/320/240/dog',
  ]).pop() as string

  const handleSendComment = async (content: string) => {
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
        onSuccess: () => {
          refetch()
        },
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
          className="h-auto w-auto p-0 m-0 bg-transparent hover:bg-transparent border-none focus:border-none outline-none focus:outline-none active:scale-110 transition relative"
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
                    data?.map((comment) => <PatternComment key={comment.id} {...comment} />)
                  ) : (
                    <p className="text-center text-base text-muted-foreground py-10">
                      No comments yet
                    </p>
                  )}
                  {/* <CommentSkeleton /> */}
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

export default PatternComments
