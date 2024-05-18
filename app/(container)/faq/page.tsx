'use client'

import React from 'react'

import { useQuery } from 'react-query'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shadcn/ui/accordion'

import { FAQService } from '@/src/entities/faq'
import { RichContent } from '@/src/shared'

const Page = () => {
  const { data } = useQuery([FAQService.entity], () => FAQService.find())
  return (
    <div className="mx-auto my-0 h-full w-full py-10 md:w-4/6 ">
      <div className="bg-slate-100/60 p-10 shadow-md backdrop-blur-md dark:bg-stone-920/60">
        <h1 className="text-xl font-bold">FAQs</h1>
        <Accordion type="single" collapsible className="w-full">
          {data?.questions?.map((question) => (
            <AccordionItem key={question.id} value={`item-${question?.id}`}>
              <AccordionTrigger>{question.question}</AccordionTrigger>
              <AccordionContent>
                <RichContent content={question.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
          {/* <AccordionItem value="item-1">
            <AccordionTrigger>
              Какие способы оплаты вы принимаете?
            </AccordionTrigger>
            <AccordionContent>
              Мы принимаем множество способов оплаты, включая Visa, MasterCard и
              Elcard. Все платежи проходят через защищенные платежные системы,
              чтобы обеспечить безопасность ваших данных и денежных средств.
            </AccordionContent>
          </AccordionItem> */}
        </Accordion>
      </div>
    </div>
  )
}

export default Page
