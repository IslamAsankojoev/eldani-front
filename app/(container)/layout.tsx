import type { Metadata } from 'next'

import '../globals.css'

export const metadata: Metadata = {
  title: 'Eldani',
  description: 'patterns for your projects',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: true,
  },
}

export interface ContainerLayoutProps {
  children: React.ReactNode
}

export default function ContainerLayout({ children }: ContainerLayoutProps) {
  return (
    <>
      {typeof window !== 'undefined' ? null : (
        <>
          <div className="container flex flex-col justify-center">
            {children}
          </div>
        </>
      )}
    </>
  )
}
