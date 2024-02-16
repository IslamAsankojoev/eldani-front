import { Toaster } from '@/shadcn/ui/toaster'

import '../../globals.css'

export interface ProfileLayoutProps {
  children: React.ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <>
      <div className="container flex max-w-[600px] flex-col justify-center py-10">
        {children}
        <Toaster />
      </div>
    </>
  )
}
