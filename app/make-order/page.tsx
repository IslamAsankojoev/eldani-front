'use client'
import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/shadcn/ui/button'
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
import { Card } from '@/shadcn/ui/card'
import { Label } from '@/shadcn/ui/label'

const formSchema = z.object({
  username: z.string().min(1, {
    message: 'Username is required',
  }),
  phone: z.string().min(1, {
    message: 'Phone number is required',
  }),
})

const requiredSchema = formSchema.required()

const Page = () => {
  const form = useForm({
    resolver: zodResolver(requiredSchema),
    defaultValues: {
      username: '',
      phone: '' as any,
    },
  })

  const onSubmit = (data: z.infer<typeof requiredSchema>) => {
    console.log(data)
  }

  return (
    <Card className='p-5'>
      <Form {...form}>
        <h1 className='font-extrabold text-2xl mb-4 text-center'>
        Make order individual clothe
        </h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <Label>Username</Label>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
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
                <Label>Phone number</Label>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <hr className='mt-6 border-none'/>
          <Button className='px-20' type="submit">Submit order</Button>
        </form>
      </Form>
    </Card>
  )
}

export default Page
