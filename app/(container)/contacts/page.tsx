'use client'

import { useEffect, useState } from 'react'

import yandex from '@/public/images/yandex.png'
import Image from 'next/image'

import { Card } from '@/shadcn/ui/card'

import { cn } from '@/src/shared/libs/utils'
import { Separator } from '@/shadcn/ui/separator'

const Page = () => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setActive(1)
    }, 500)
  }, [])

  return (
    <div>
      <br />
      <div className="flex flex-col-reverse gap-4 md:flex-row">
        <Card className="relative h-[400px] flex-grow-[2] overflow-hidden">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aaffd4e2f975946e5db4ddd396893a405f5f404d9d9bbcf942f40245f60dd6821&amp;source=constructor"
            width="100%"
            height="600"
            className={cn(
              active ? 'z-10 opacity-100' : 'z-0 opacity-0',
              'absolute left-0 top-0',
            )}
          ></iframe>
          <Image
            src={yandex}
            alt="Map image"
            fill
            className={cn(
              active ? 'z-0 opacity-0' : 'z-10 opacity-100',
              'absolute left-0 top-0 object-cover',
            )}
          />
        </Card>
        <Card className="flex-grow border-none bg-transparent shadow-none md:p-4">
          <div className="flex h-full flex-col justify-center gap-4 md:items-center md:text-center">
            <h1 className="text-3xl font-bold">Контакты</h1>
            <div className="flex flex-col gap-1 p-1">
              <h2 className="text-xl font-bold">Адрес</h2>
              <p className="text-base">г. Бишкек, ул. Манас, 8</p>
            </div>
            <Separator />
            <div className="flex flex-col gap-1 p-1">
              <h2 className="text-xl font-bold">Телефон</h2>
              <p className="text-base">+996 707 284 954</p>
            </div>
            <Separator />
            <div className="flex flex-col gap-1 p-1">
              <h2 className="text-xl font-bold">E-mail</h2>
              <p className="text-base">
                <a href="mailto:isla.asankojoev@mail.ru" className="text-base">
                  isla.asankojoev@mail.ru
                </a>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Page
