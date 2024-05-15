'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { z } from 'zod'

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
    await mutateAsync(data)
    refetch()
  }

  return (
    <div className="flex flex-col items-start">
      <h1 className="p-4 pt-2 text-2xl font-bold">Профиль</h1>
      <Card className="w-full min-w-96 max-w-[500px] border-0 bg-white p-4 dark:bg-stone-950/60">
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
