'use client'

import React from 'react'

import { usePathname } from 'next/navigation'

import { cn } from '@/src/shared'

export const MainLayoutProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname()

  return (
    <>
      <div className={cn('flex-grow', pathname === '/' ? 'container' : '')}>
        {children}
      </div>
    </>
  )
}
