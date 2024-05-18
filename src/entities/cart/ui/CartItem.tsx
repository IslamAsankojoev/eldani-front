import { FC } from 'react'

import { useMediaQuery } from '@mui/material'
import { Eye, X } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'

import PDF from '/public/pdf.svg'

export const CartItem: FC<Pattern> = (pattern) => {
  const isSmall = useMediaQuery('(max-width: 640px)')
  return (
    <Card className="rounded-md border-0 p-2 dark:bg-stone-950/60 md:p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={PDF}
            alt={pattern?.name || 'pdf pattern'}
            width={64}
            height={64}
            className="rounded-md"
          />
          <div className="ml-2">
            <h3 className="text-lg font-semibold">{pattern.name}</h3>
            <p className="text-lg font-bold">{pattern.price}c</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
          <Button
            variant="secondary"
            className="h-8 w-8 p-2 md:h-fit md:w-fit md:p-2"
            size={isSmall ? 'icon' : 'default'}
          >
            {isSmall ? <Eye /> : 'Перейти'}
          </Button>
          <Button
            variant="destructive"
            className="h-8 w-8 p-2 md:h-fit md:w-fit md:p-2"
            size={isSmall ? 'icon' : 'default'}
          >
            {isSmall ? <X /> : 'Убрать'}
          </Button>
        </div>
      </div>
    </Card>
  )
}
