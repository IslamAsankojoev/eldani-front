import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import Menu from '@/components/Header/Menu'
import Footer from '@/components/Footer/Footer'
import { QueryClientProvider } from '@/providers/QueryClientProvider'

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
        <body className="dark:bg-stone-900 bg-slate-100">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryClientProvider>
              <main>
                <Menu />
                {typeof window !== 'undefined' ? null : (
                  <div className="container flex-grow">{children}</div>
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
