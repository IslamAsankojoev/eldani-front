import { useEffect, useState } from 'react'

import type { NextPage } from 'next'
import { BottomSheet } from 'react-spring-bottom-sheet'

import { Button } from '@/shadcn/ui/button'

const TestDrawer = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  function onDismiss() {
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <BottomSheet
        open={open}
        onDismiss={onDismiss}
        defaultSnap={({ snapPoints, lastSnap }) =>
          lastSnap ?? Math.min(...snapPoints)
        }
        snapPoints={({ maxHeight }) => [
          maxHeight - maxHeight / 5,
          maxHeight * 0.6,
        ]}
        header={
          <h1 className="flex items-center justify-center text-xl font-bold text-gray-800">
            Sticky!
          </h1>
        }
        footer={
          <Button onClick={onDismiss} className="w-full">
            Done
          </Button>
        }
      >
        <div>
          <p>
            Just as with content, if the header or footer changes their height
            the sheet will readjust accordingly.
          </p>

          <p>
            When you provide a header the draggable area increases, making it
            easier for users to adjust the height of the bottom sheet.
          </p>
          <p>
            The same is true for a sticky footer, as it supports drag gestures
            as well to optimize for large phones where the header might be
            difficult to reach with one hand.
          </p>
        </div>
      </BottomSheet>
    </>
  )
}

export default TestDrawer
