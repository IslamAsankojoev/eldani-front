'use client'

import React from 'react'

import elkart from '@/public/images/elkart.svg'
import maestro from '@/public/images/maestro.svg'
import mastercard from '@/public/images/mastercard.svg'
import telegramImage from '@/public/images/telegram.png'
import visa from '@/public/images/visa.svg'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from 'react-query'

import { PageService } from '@/src/entities/page'

export const Footer = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { data: pages } = useQuery([PageService.entity], () =>
    PageService.find(),
  )
  return (
    <footer className="mt-4 border-t-2 bg-stone-950 p-4 py-6 text-center text-sm text-muted-foreground">
      <div className="container flex flex-col justify-center gap-4 md:flex-row md:justify-between">
        <div className="flex flex-col items-start gap-2">
          <div>
            &copy;2024 Все права защищены
            <span className="text-white">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
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
            <div className="flex flex-row gap-2">
              <Link href="/faq" className="hover:text-rose-500">
                Вопросы и ответы
              </Link>
              {pages?.map((item) => (
                <Link
                  key={item.id}
                  href={`/policy/${item.slug}`}
                  className="hover:text-rose-500"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-row justify-center gap-1 md:justify-end items-center">
        <span className="relative h-5 w-14">
            <Image src={visa} alt="Telegram" fill />
          </span>
          <span className="relative h-5 w-20">
            <Image src={maestro} alt="Telegram" fill />
          </span>
          <span className="relative h-5 w-20">
            <Image src={mastercard} alt="Telegram" fill />
          </span>
          <span className="relative h-5 w-20">
            <Image src={elkart} alt="Telegram" fill />
          </span>
        </div>
      </div>
    </footer>
  )
}
