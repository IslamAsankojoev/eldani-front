import type { Metadata } from 'next'

import {
  MainLayoutProvider,
  QueryClientProvider,
  ThemeProvider,
} from '@/src/app/providers'
import { Footer } from '@/src/entities/footer'
import { Header } from '@/src/entities/header'

import './globals.css'

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

export interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning translate="no">
        <head />
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
        </body>
      </html>
    </>
  )
}
