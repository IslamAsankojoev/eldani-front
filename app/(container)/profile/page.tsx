'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Phone } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { z } from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shadcn/ui/form'
import { Input } from '@/shadcn/ui/input'
import { Label } from '@/shadcn/ui/label'
import { useToast } from '@/shadcn/ui/use-toast'

import { UserService } from '@/src/entities/user'
import { useUser } from '@/src/entities/user/query'

const formSchema = z.object({
  username: z.string().min(1, {
    message: 'Имя указывать обязательно',
  }),
  phone: z.string().min(1, {
    message: 'Номер телефона обязателен',
  }),
  id: z.number(),
})

const Page = () => {
  const { data: user, refetch } = useUser()
  const { toast } = useToast()

  const { mutateAsync } = useMutation(
    (data: Partial<User>) => UserService.updateMe(data),
    {
      onSuccess: () => {
        toast({
          title: 'Профиль',
          description: 'Успешно обновлен',
          variant: 'success',
          duration: 2000,
        })
      },
    },
  )

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      phone: '',
      id: 0,
    },
    values: {
      username: user?.username as string,
      phone: user?.phone as string,
      id: user?.id as number,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(12)
    await mutateAsync(data)
    refetch()
  }

  return (
    <div className="relative flex flex-col justify-center gap-4">
      <Card className="space-4 flex flex-col items-center gap-4 bg-white p-4 dark:bg-stone-920">
        <div className="flex w-full justify-between">
          <div className="flex gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.avatar_google} alt="@shadcn" />
              <AvatarFallback>{user?.email[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-base font-bold">{user?.username}</p>
              <p className="text-sm">{user?.email}</p>
              {/* <div className="flex w-full items-center gap-2 text-sm">
                {user?.phone} <Phone width={15} height={15} />
              </div> */}
            </div>
          </div>
          <Button
            asChild
            className="h-[initial] self-center text-rose-600 hover:bg-rose-500/10 hover:text-rose-600"
            variant="ghost"
          >
            <Link href="/api/logout?logout=true">Выйти</Link>
          </Button>
        </div>
      </Card>
      <Card className="bg-white p-4 dark:bg-stone-920">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className="hidden">
                  <Label>id</Label>
                  <FormControl>
                    <Input type="number" placeholder="id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label>Имя</Label>
                  <FormControl>
                    <Input placeholder="Ваше имя" {...field} />
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
                  <Label>Номер телефона</Label>
                  <FormControl>
                    <Input placeholder="Ваш номер" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="avatar"
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
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button className="px-20" type="submit">
              Обновить
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default Page
