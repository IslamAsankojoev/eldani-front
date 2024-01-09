'use client'
import * as React from 'react'
import { ChevronRight, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/shadcn/ui/button'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const handleClick = (theme: string) => {
    setTheme(theme)
  }

  return (
    <Button
      className="dark:bg-stone-900"
      variant="secondary"
      size="icon"
      onClick={() => handleClick(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <Sun className="w-6 h-6" strokeWidth={1} />
      ) : (
        <Moon className="w-6 h-6" strokeWidth={1} />
      )}
    </Button>
  )
}
