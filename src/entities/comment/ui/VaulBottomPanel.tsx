import * as React from 'react'

import { MessageCircle } from 'lucide-react'

import { Button } from '@/shadcn/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from '@/shadcn/ui/drawer'

interface Props {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}

export const VaulBottomPanel = ({ children, header, footer }: Props) => {
  return (
    <Drawer snapPoints={[0.6]}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="relative m-0 h-auto w-auto border-none bg-transparent p-2 outline-none !ring-transparent transition hover:bg-transparent focus:border-none focus:outline-none active:scale-110"
        >
          <MessageCircle size={23} strokeWidth={1.25} absoluteStrokeWidth />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="m-0 p-0">{header}</DrawerHeader>
        <div className="w-full">{children}</div>
        <DrawerFooter>{footer}</DrawerFooter>
      </DrawerContent>
      <DrawerOverlay />
    </Drawer>
  )
}
