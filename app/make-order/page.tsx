'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as z from 'zod'

import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/shadcn/ui/form'
import { Input } from '@/shadcn/ui/input'
import { Textarea } from '@/shadcn/ui/textarea'
import { useToast } from '@/shadcn/ui/use-toast'

import { BotService, requiredSchema } from '@/src/entities/telegram'
import { isFieldRequired } from '@/src/shared'

const Page = () => {
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(requiredSchema),
    defaultValues: {
      username: '',
      phone: '' as any,
      telegram: '',
      message: '',
      file: null as any,
    },
  })
  const { mutateAsync } = useMutation(
    (data: z.infer<typeof requiredSchema>) => BotService.sendDocument(data),
    {
      onSuccess: () => {
        toast({
          title: 'Заявка',
          description: 'Успешно отправлена',
          variant: 'success',
          duration: 2000,
        })
        form.reset()
      },
    },
  )

  const onSubmit = async (data: z.infer<typeof requiredSchema>) => {
    mutateAsync(data)
  }

  return (
    <Card className="w-full border-none p-5 backdrop-blur-md dark:bg-stone-950/60">
      <Form {...form}>
        <h1 className="mb-4 text-center text-xl font-extrabold md:text-xl">
          Заказать пошив одежды
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
                  <Input
                    placeholder="Имя"
                    required={isFieldRequired(requiredSchema, 'username')}
                    {...field}
                  />
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
                  <Input
                    placeholder="Номер телефона"
                    required={isFieldRequired(requiredSchema, 'phone')}
                    {...field}
                  />
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
                  <Input
                    placeholder="Telegram @nickname"
                    required={isFieldRequired(requiredSchema, 'telegram')}
                    {...field}
                  />
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
                  <Textarea
                    placeholder="Сообщение"
                    required={isFieldRequired(requiredSchema, 'message')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={() => (
              <FormItem>
                <FormControl>
                  <>
                    <Input
                      type="file"
                      placeholder="File"
                      required={isFieldRequired(requiredSchema, 'file')}
                      {...form.register('file')}
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
          <Button type="submit">Отправить</Button>
        </form>
      </Form>
    </Card>
  )
}

export default Page
