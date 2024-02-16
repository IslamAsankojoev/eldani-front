import '../../globals.css'

export interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      {typeof window !== 'undefined' ? null : (
        <>
            {children}
        </>
      )}
    </>
  )
}
