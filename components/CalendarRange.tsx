'use client'

import * as React from 'react'

import { Calendar } from '@/shadcn/ui/calendar'
import { DateRange } from 'react-day-picker'

export function CalendarRange() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
  })

  return (
    <Calendar
      mode="range"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
      numberOfMonths={2}
    />
  )
}
