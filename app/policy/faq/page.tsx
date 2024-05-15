import React from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shadcn/ui/accordion'

const Page = () => {
  return (
    <div className="mx-auto my-0 h-full w-full py-10 md:w-4/6 ">
      <div className="bg-slate-100/60 p-10 shadow-md backdrop-blur-md dark:bg-stone-920/60">
        <h1 className="text-xl font-bold">FAQs</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Какие способы оплаты вы принимаете?
            </AccordionTrigger>
            <AccordionContent>
              Мы принимаем множество способов оплаты, включая Visa, MasterCard и
              Elcard. Все платежи проходят через защищенные платежные системы,
              чтобы обеспечить безопасность ваших данных и денежных средств.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Как купить товар?</AccordionTrigger>
            <AccordionContent>
              Для покупки товара вам необходимо:
              <ul className="!list-disc gap-2">
                <li>1. Выбрать желаемый паттерн из нашего каталога.</li>
                <li>2. Кликнуть на кнопку «Добавить в корзину».</li>
                <li>3. Перейти в корзину и кликнуть «Перейти к оформлению».</li>
                <li>
                  4. Заполнить необходимые поля для доставки и выбрать способ
                  оплаты.
                </li>
                <li>
                  5. Подтвердить заказ, и после обработки платежа паттерн будет
                  отправлен вам по электронной почте или доступен для скачивания
                  на сайте в вашем личном кабинете.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              В каком формате предоставляются паттерны?
            </AccordionTrigger>
            <AccordionContent>
              Все наши паттерны предоставляются в PDF формате, который можно
              легко скачать и распечатать дома или в любом месте, где есть
              доступ к принтеру. Для просмотра и печати файлов вам понадобится
              Adobe Reader или любое другое ПО, которое поддерживает формат PDF.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Есть ли у вас возвраты или обмены?
            </AccordionTrigger>
            <AccordionContent>
              Так как паттерны представляют собой цифровые товары, мы не можем
              предложить возврат или обмен после того, как файл был отправлен
              или загружен. Однако мы стремимся к тому, чтобы все наши клиенты
              были довольны покупкой. Если у вас возникнут проблемы с вашим
              заказом, пожалуйста, свяжитесь с нашей службой поддержки для
              решения вопроса.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              Могу ли я использовать ваши паттерны для коммерческого
              производства одежды?
            </AccordionTrigger>
            <AccordionContent>
              Наши паттерны предназначены для личного использования и обучения.
              Для коммерческого использования паттернов требуется приобретение
              коммерческой лицензии. Пожалуйста, свяжитесь с нами для получения
              дополнительной информации и условий приобретения коммерческих
              лицензий.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default Page
