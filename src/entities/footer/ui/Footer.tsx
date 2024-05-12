'use client'

import React from 'react'

import elkart from '@/public/images/elkart.svg'
import maestro from '@/public/images/maestro.svg'
import mastercard from '@/public/images/mastercard.svg'
import telegramImage from '@/public/images/telegram.png'
import visa from '@/public/images/visa.svg'
import Image from 'next/image'
import Link from 'next/link'
import { policyNavigationList } from '@/src/shared/constants/navMenuRoutes'
import useMediaQuery from '@mui/material/useMediaQuery'

export const Footer = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  return (
    <footer className="mt-4 border-t-2 bg-stone-950 p-4 py-6 text-center text-sm text-muted-foreground">
      <div className="container flex flex-col gap-4 justify-center md:flex-row md:justify-between">
        <div className='flex flex-col items-start gap-2'>
         <div>
         &copy;2024 Все права защищены 
          <span className='text-white'>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
         Made by &nbsp;
          <a
            href="https://t.me/uclami"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex flex-row items-center justify-center gap-2 hover:text-sky-500"
          >
            <span className="font-bold">Islam Asankojoev</span>
            <Image
              src={telegramImage}
              alt="Telegram"
              width={17}
              height={17}
              className="inline-block saturate-0 group-hover:saturate-100"
            />
          </a>
         </div>
         {isDesktop && (
          <div className='flex flex-row gap-2'>
          {policyNavigationList.map((item) => (
            <Link key={item.name} href={item.href} className="hover:text-rose-500">
              {item.name}
            </Link>
          ))}
         </div>
         )}
        </div>
        <div className="flex flex-row gap-2 justify-center md:justify-end">
          <Image src={maestro} alt="Telegram" height={22} />
          <Image src={mastercard} alt="Telegram" height={22} />
          <Image src={elkart} alt="Telegram" height={22} />
          <Image src={visa} alt="Telegram" height={22} />
        </div>
      </div>
    </footer>
  )
}
