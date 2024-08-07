import type { Metadata } from 'next'
import { Jost } from 'next/font/google'

import { Toaster } from '@/shadcn/ui/toaster'

import {
  MainLayoutProvider,
  QueryClientProvider,
  ThemeProvider,
} from '@/src/app/providers'
import { Footer } from '@/src/widgets/footer'
import { Header } from '@/src/widgets/header'

import './globals.css'

export const metadata: Metadata = {
  title: 'Eldani',
  description: 'patterns for your projects',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: true,
  },
  icons: {
    icon: '/icon.png',
  }
}

const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
})

export interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning translate="no" className={jost.className}>
        <head>
          <link rel="icon" href="/icon.png" />
        </head>
        <body className="bg-slate-100 dark:bg-stone-900">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryClientProvider>
              <main>
                <Header />
                {typeof window !== 'undefined' ? null : (
                  <MainLayoutProvider>{children}</MainLayoutProvider>
                )}
                <Footer />
              </main>
            </QueryClientProvider>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </>
  )
}
