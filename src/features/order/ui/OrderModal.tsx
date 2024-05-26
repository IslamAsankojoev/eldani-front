import { FC, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { z } from 'zod'

import { Button } from '@/shadcn/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shadcn/ui/form'
import { Input } from '@/shadcn/ui/input'

import { OrderService } from '@/src/entities/order'
import { BotService } from '@/src/entities/telegram'
import { useUser } from '@/src/entities/user/query'
import { isFieldRequired } from '@/src/shared'

interface OrderModalProps {
  patterns: Pattern[]
}

export const requiredSchema = z.object({
  username: z.string().min(0, 'Введите ваше имя'),
  phone: z.string().min(0, 'Введите ваш телефон'),
  telegram: z.string(),
})

export const OrderModal: FC<OrderModalProps> = ({ patterns }) => {
  const { data: user } = useUser()
  const [open, setOpen] = useState(false)
  const form = useForm({
    resolver: zodResolver(requiredSchema),
    defaultValues: {
      username: '',
      phone: '' as any,
      telegram: '',
    },
  })
  const { mutateAsync: sendMessage } = useMutation(
    'telegramSendMessage',
    (formData: z.infer<typeof requiredSchema> & { id: string }) =>
      BotService.sendOrderMessage(formData),
    {
      onSuccess: () => {
        setOpen(false)
        form.reset()
      },
    },
  )
  const { mutateAsync: createOrder } = useMutation(
    'createOrder',
    (orderData: Order) => OrderService.create(orderData),
    {
      onSuccess: async (order) => {
        await sendMessage({
          id: order.uuid as string,
          username: form.getValues().username,
          phone: form.getValues().phone,
          telegram: form.getValues().telegram,
        })
      },
    },
  )

  const onSubmit = async (values: any) => {
    createOrder({
      products: patterns,
      ...values,
      user: user?.id,
      price:
        patterns
          .map((pattern) => Number(pattern?.price) * pattern?.sizes?.length)
          .reduce((a, b) => a + b, 0) + '',
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="flex-grow text-base md:flex-grow-0">
          Оформить заказ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <>
          <DialogHeader>
            <DialogTitle>Оформить заказ</DialogTitle>
            <DialogDescription>
              Чтобы оформить заказ, заполните форму и наш менеджер свяжется с
              вами
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => {
                  return (
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
                  )
                }}
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
                      <Input placeholder="Telegram @nickname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <hr className="mt-6 border-none" />
              <Button type="submit">Оформить заказ</Button>
            </form>
          </Form>
        </>
      </DialogContent>
    </Dialog>
  )
}
