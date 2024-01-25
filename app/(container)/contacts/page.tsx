'use client'
import { useEffect, useState } from 'react'

import yandex from '@/public/images/yandex.png'
import Image from 'next/image'

import { Card } from '@/shadcn/ui/card'
import { cn } from '@/src/shared/libs/utils'

const Page = () => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    setTimeout(()=>{
      setActive(1)
    }, 500)
  }, [])

  return (
    <div className="mt-6 h-full md:mt-28">
      <div className="flex flex-col-reverse gap-4 md:flex-row">
        <Card className="relative h-[500px] flex-grow overflow-hidden">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aaffd4e2f975946e5db4ddd396893a405f5f404d9d9bbcf942f40245f60dd6821&amp;source=constructor"
            width="100%"
            height="500"
            className={
              cn(active ? 'opacity-100 z-10' : 'opacity-0 z-0',
              'absolute top-0 left-0')
            }
          ></iframe>
          <Image src={yandex} alt="Map image" fill  className={
            cn(
              active ? 'opacity-0 z-0' : 'opacity-100 z-10',
              'absolute top-0 left-0 object-cover'
            )
          }/>
        </Card>
        <Card className="flex-grow border-none bg-transparent shadow-none md:p-4">
          <div className="flex h-full flex-col justify-center gap-4 md:items-center md:text-center">
            <h1 className="text-3xl font-bold">Контакты</h1>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">Адрес</h2>
              <p className="text-base">г. Бишкек, ул. Манас, 8</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">Телефон</h2>
              <p className="text-base">+996 707 284 954</p>
            </div>
            <div className="flex flex-col gap-1">
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
