'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/shadcn/ui/button'

export const ModeToggle = () => {
  const { setTheme, theme } = useTheme()

  const handleClick = (theme: string) => {
    setTheme(theme)
  }
  console.log('theme', theme)

  return !!theme ? (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => handleClick(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <Sun className="w-6 h-6" strokeWidth={1.6} />
      ) : (
        <Moon className="w-6 h-6" strokeWidth={1.4} />
      )}
    </Button>
  ) : null
}
