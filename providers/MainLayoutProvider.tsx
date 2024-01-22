'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

const MainLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathanme = usePathname()
  if (pathanme === '/') {
    return (
      <>
        <div className="container flex-grow">{children}</div>
      </>
    )
  }

  return (
    <>
      <div className="flex-grow">{children}</div>
    </>
  )
}

export default MainLayoutProvider
