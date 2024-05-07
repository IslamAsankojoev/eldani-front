'use client'

import React from 'react'
import Image from 'next/image'
import telegramImage from '@/public/images/telegram.png'

export const Footer = () => {
  return (
    <footer className="text-muted-foreground mt-4 border-t-2 bg-stone-950 p-4 text-center text-sm">
      &copy;2024 Все права защищены &nbsp;|&nbsp;&nbsp;Made by &nbsp;
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
    </footer>
  )
}
