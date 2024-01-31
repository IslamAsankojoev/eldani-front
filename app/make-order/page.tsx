'use client'

import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import * as z from 'zod'

import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn/ui/form'
import { Input } from '@/shadcn/ui/input'
import { Label } from '@/shadcn/ui/label'
import { Textarea } from '@/shadcn/ui/textarea'
import { ky } from '@/src/app/config'
import { useSearchParams } from 'next/navigation'

const formSchema = z.object({
  username: z.string().min(1, {
    message: 'Имя указывать обязательно',
  }),
  phone: z.string().min(1, {
    message: 'Номер телефона обязателен',
  }),
  telegram: z.string(),
  message: z.string(),
  file: z.string(),
})

const requiredSchema = formSchema.required()

const Page = () => {
  const searchParams = useSearchParams()
  const form = useForm({
    resolver: zodResolver(requiredSchema),
    defaultValues: {
      username: '',
      phone: '' as any,
      telegram: '',
      message: '',
      file: '',
    },
  })

  const onSubmit = (data: z.infer<typeof requiredSchema>) => {
    console.log(data)
  }

  return (
    <Card className="p-5 dark:bg-[#1a1615]">
      <Form {...form}>
        <h1 className="mb-4 text-center text-xl font-extrabold md:text-xl">
          Хотите заказать
          <br /> индивидуальный пошив одежды?
        </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Имя" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Номер телефона" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telegram"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Telegram @nickname" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Сообщение" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <Input
                      type="file"
                      placeholder="File"
                      {...field}
                      className="inline-block cursor-pointer"
                    />
                  </>
                </FormControl>
                <FormDescription>
                  Можете прикрепить файл, связанный с пошивом одежды
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <hr className="mt-6 border-none" />
          <Button className="px-20" type="submit">
            Отправить
          </Button>
        </form>
      </Form>
    </Card>
  )
}

export default Page
