'use client'

import { useRef, useState } from 'react'

import { MessageCircle } from 'lucide-react'
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet'
// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">
import 'react-spring-bottom-sheet/dist/style.css'

import { Button } from '@/shadcn/ui/button'

import { cn } from '@/src/shared'

interface Props {
  children: React.ReactNode
  header: React.ReactNode
  footer?: React.ReactNode
}

export const BottomPanel = ({ children, header, footer }: Props) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  function onDismiss() {
    setOpen(false)
  }

  return (
    <>
      <Button
        variant="ghost"
        className="relative m-0 h-auto w-auto border-none bg-transparent p-2 outline-none !ring-transparent transition hover:bg-transparent focus:border-none focus:outline-none active:scale-110"
        onClick={handleOpen}
      >
        <MessageCircle size={23} strokeWidth={1.25} absoluteStrokeWidth />
      </Button>
      <BottomSheet
        initialFocusRef={useRef(null)}
        expandOnContentDrag
        open={open}
        onDismiss={onDismiss}
        defaultSnap={({ snapPoints, lastSnap }) =>
          // lastSnap ?? Math.min(...snapPoints)
          snapPoints[0]
        }
        snapPoints={({ maxHeight }) => [
          maxHeight * 0.6,
          // maxHeight * 0.8,
        ]}
        header={header}
        footer={footer}
      >
        {children}
      </BottomSheet>
    </>
  )
}
