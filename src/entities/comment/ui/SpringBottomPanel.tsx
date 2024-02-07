'use client'

import { useRef, useState } from 'react'

import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'

import './style.css'

interface Props {
  children: React.ReactNode
  header: React.ReactNode
  footer?: React.ReactNode
  trigger?: React.ReactNode
  open: boolean
  handleDismiss: () => void
}

export const BottomPanel = ({
  children,
  header,
  footer,
  trigger,
  open,
  handleDismiss,
}: Props) => {
  const sheetRef = useRef<BottomSheetRef>(null)
  const spanRef = useRef<HTMLSpanElement>(null)
  return (
    <>
      {trigger}
      <span ref={spanRef} />
      <BottomSheet
        onSpringStart={(e) => {
          const modal = document.body.querySelector(
            '[data-rsbs-overlay="true"]',
          )
          // @ts-ignore
          modal.style.transition = 'opacity 0.150s'
          if (e.type === 'CLOSE') {
            // @ts-ignore
            modal.style.opacity = '0'
            document.body.click()
          } else {
            // @ts-ignore
            modal.style.opacity = '1'
          }
        }}
        ref={sheetRef}
        skipInitialTransition
        initialFocusRef={useRef(null)}
        expandOnContentDrag
        open={open}
        onDismiss={handleDismiss}
        defaultSnap={({ snapPoints }) => snapPoints[0]}
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
