'use client'

import { useEffect, useState } from 'react'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/shadcn/ui/button'

export const ModeToggle = () => {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const handleClick = (theme: string) => {
    setTheme(theme)
  }

  useEffect(() => setMounted(true), [])

  return mounted ? (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => handleClick(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full"
    >
      {theme === 'dark' ? (
        <Sun className="h-6 w-6" strokeWidth={1.6} />
      ) : (
        <Moon className="h-6 w-6" strokeWidth={1.4} />
      )}
    </Button>
  ) : null
}
