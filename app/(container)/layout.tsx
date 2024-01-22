import type { Metadata } from 'next'
import '../globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import Menu from '@/components/Header/Menu'
import Footer from '@/components/Footer/Footer'
import { QueryClientProvider } from '@/providers/QueryClientProvider'
import MainLayoutProvider from '@/providers/MainLayoutProvider'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
          <div className="container">{children}</div>
        </>
      )}
    </>
  )
}
