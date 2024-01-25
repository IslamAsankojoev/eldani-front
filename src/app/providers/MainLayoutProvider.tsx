'use client'
import { cn } from '@/src/shared'
import { usePathname } from 'next/navigation'
import React from 'react'

export const MainLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const theme = 'white'

  return (
    <>
      <div className={cn('flex-grow', pathname === '/' ? 'container' : '')}>{children}</div>
    </>
  )
}
