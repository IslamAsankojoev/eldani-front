import * as React from 'react'
import { styled } from '@mui/material/styles'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Button } from '@/shadcn/ui/button'
import { MessageCircle } from 'lucide-react'
import { Global } from '@emotion/react'
import colors from 'tailwindcss/colors'
import { Separator } from '@/shadcn/ui/separator'
import { useTheme } from 'next-themes'

const drawerBleeding = 56

interface Props {
  window?: () => Window
  children: React.ReactNode
  open: boolean
  handleDismiss: () => void
  header: React.ReactNode
  footer: React.ReactNode
  handleOpen: () => void
}

const Puller = styled('div')(() => ({
  width: 30,
  height: 3,
  borderRadius: 3,
  position: 'absolute',
  top: 10,
  left: 'calc(50% - 15px)',
}))

export default function MuiBottomDrawer(props: Props) {
  const { window, children, open, handleDismiss, header, footer, handleOpen } =
    props
  const { theme } = useTheme()
  const color = theme === 'dark' ? colors.stone[200] : colors.stone[800]

  const container =
    window !== undefined ? () => window().document.body : undefined
  return (
    <div className="h-full ">
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(70% - ${drawerBleeding}px)`,
            overflow: 'visible',
            background: 'transparent',
            color,
          },
        }}
      />
      <Button
        variant="ghost"
        className="relative m-0 h-auto w-auto border-none bg-transparent p-2 outline-none !ring-transparent transition hover:bg-transparent focus:border-none focus:outline-none active:scale-110"
        onClick={handleOpen}
      >
        <MessageCircle size={23} strokeWidth={1.25} absoluteStrokeWidth />
      </Button>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={handleDismiss}
        onOpen={handleOpen}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        transitionDuration={200}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div
          style={{
            position: 'absolute',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller className="bg-stone-200 dark:bg-stone-600" />
        </div>
        <div className="dark:!bg-stone-920 flex h-full flex-col justify-between overflow-hidden rounded-t-xl bg-white">
          <div>{header}</div>
          <Separator />
          <div className="flex-grow overflow-auto !p-0">{children}</div>
          <div>{footer}</div>
        </div>
      </SwipeableDrawer>
    </div>
  )
}
