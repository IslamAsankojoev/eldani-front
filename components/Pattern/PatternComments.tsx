'use client'
import avatar1 from '/public/images/avatar1.jpg'
import avatar2 from '/public/images/avatar2.jpg'
import avatar3 from '/public/images/avatar3.jpg'

import * as React from 'react'
import { Button } from '@/shadcn/ui/button'
import { Input } from '@/shadcn/ui/input'
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
import { LoremIpsum } from 'lorem-ipsum'
import { redirect, useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

const comments = [
  {
    id: 1,
    name: 'John Doe',
    createdAt: '2021-08-03T12:00:00.000Z',
    avatar: avatar1,
    comment: new LoremIpsum().generateWords(10) + ' 😂😂',
  },
  {
    id: 2,
    name: 'James Cameron',
    createdAt: '2021-08-02T12:00:00.000Z',
    avatar: avatar2,
    comment: new LoremIpsum().generateWords(5),
  },
  {
    id: 3,
    name: 'Michael Bay',
    createdAt: '2021-08-01T12:00:00.000Z',
    avatar: avatar1,
    comment: new LoremIpsum().generateWords(15) + ' 😳😍',
  },
  {
    id: 4,
    name: 'Michael Bay',
    createdAt: '2021-08-01T12:00:00.000Z',
    avatar: avatar2,
    comment: new LoremIpsum().generateWords(20),
  },
  {
    id: 5,
    name: 'Michael Bay',
    createdAt: '2023-08-01T12:00:00.000Z',
    avatar: avatar1,
    comment: new LoremIpsum().generateWords(10) + ' 😍😍',
  },

  {
    id: 6,
    name: 'Michael Bay',
    createdAt: '2024-01-01T12:00:00.000Z',
    avatar: avatar3,
    comment: new LoremIpsum().generateWords(10),
  },

  {
    id: 7,
    name: 'Michael Bay',
    createdAt: '2024-01-04T12:00:00.000Z',
    avatar: avatar1,
    comment: new LoremIpsum().generateWords(13),
  },
  {
    id: 8,
    name: 'John Doe',
    createdAt: '2021-08-03T12:00:00.000Z',
    avatar: avatar1,
    comment: new LoremIpsum().generateWords(10) + ' 😂😂',
  },
  {
    id: 9,
    name: 'James Cameron',
    createdAt: '2021-08-02T12:00:00.000Z',
    avatar: avatar2,
    comment: new LoremIpsum().generateWords(5),
  },
  {
    id: 10,
    name: 'Michael Bay',
    createdAt: '2021-08-01T12:00:00.000Z',
    avatar: avatar1,
    comment: new LoremIpsum().generateWords(15) + ' 😳😍',
  },
  {
    id: 11,
    name: 'Michael Bay',
    createdAt: '2021-08-01T12:00:00.000Z',
    avatar: avatar2,
    comment: new LoremIpsum().generateWords(20),
  },
  {
    id: 12,
    name: 'Michael Bay',
    createdAt: '2023-08-01T12:00:00.000Z',
    avatar: avatar1,
    comment: new LoremIpsum().generateWords(10) + ' 😍😍',
  },

  {
    id: 13,
    name: 'Michael Bay',
    createdAt: '2024-01-01T12:00:00.000Z',
    avatar: avatar3,
    comment: new LoremIpsum().generateWords(10),
  },

  {
    id: 14,
    name: 'Michael Bay',
    createdAt: '2024-01-04T12:00:00.000Z',
    avatar: avatar1,
    comment: new LoremIpsum().generateWords(13),
  },
]

const PatternComments = () => {
  const closeRef = React.useRef<null | HTMLButtonElement>(null)
  const [open, setOpen] = React.useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  React.useEffect(() => {
    if (open) {
      router.push(`${pathname}?modal=comments`, {
        scroll: false,
      })
    }
  }, [open, router, pathname])

  const handleRemoveModal = () => {
    router.replace(pathname, {
      scroll: false,
    })
  }

  React.useEffect(() => {
    if (!searchParams.get('modal')) {
      closeRef.current && closeRef.current.click()
    }
  }, [searchParams])

  return (
    <Drawer
      dismissible={false}
      onOpenChange={(open) => {
        setOpen(open)
      }}
      onClose={handleRemoveModal}
    >
      <DrawerTrigger asChild>
        <MessageCircle size={23} strokeWidth={1.25} absoluteStrokeWidth />
      </DrawerTrigger>
      <DrawerOverlay
        onClick={() => {
          closeRef.current && closeRef.current.click()
        }}
      />
      <DrawerContent>
        <div className="w-full">
          <DrawerHeader>
            <div className="relative flex justify-center align-middle">
              <DrawerTitle>Comments</DrawerTitle>
              <DrawerClose asChild>
                <Button ref={closeRef} className="absolute right-3 p-0 m-0 h-auto bg-transparent">
                  <X className="" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <Separator />
          <ScrollArea className="h-[500px]">
            <div className="flex px-4 py-3 flex-col gap-4">
              {comments.map((comment) => (
                <PatternComment key={comment.id} {...comment} />
              ))}
            </div>
          </ScrollArea>
          <DrawerFooter>
            <Input placeholder="Write a comment..." inputMode="text" />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default PatternComments
