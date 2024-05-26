import ky from 'ky'
import { z } from 'zod'

import { orderSchema } from '@/src/features/order'

const TOKEN = '6866594369:AAG8w9icAHHJcAMHIz9Crv4EsG_R27UvgNc'
const CHAT_ID = '-4093106829'
const SEND_MESSAGE_URI = `https://api.telegram.org/bot${TOKEN}/sendMessage`
const SEND_DOCUMENT_URI = `https://api.telegram.org/bot${TOKEN}/sendDocument`

export const formSchema = z.object({
  username: z.string().min(1, {
    message: 'Имя указывать обязательно',
  }),
  phone: z.string().min(1, {
    message: 'Номер телефона обязателен',
  }),
  telegram: z.string(),
  message: z.string(),
  file: z.any(),
})
export const requiredSchema = formSchema.required()

export const BotService = {
  async sendMessage(text: z.infer<typeof requiredSchema>) {
    try {
      const response = await ky.post(SEND_MESSAGE_URI, {
        json: {
          chat_id: CHAT_ID,
          text,
        },
      })
      return response
    } catch (e) {
      throw e
    }
  },
  async sendDocument(data: z.infer<typeof requiredSchema>) {
    const formData = new FormData()
    if (data.file) formData.append('document', data.file[0])
    formData.append('chat_id', CHAT_ID)
    formData.append(
      'caption',
      `
Новая заявка на сайте
Имя: ${data.username}
Телефон: ${data.phone}
Telegram: ${data.telegram}
Сообщение: ${data.message}
`,
    )

    try {
      if (data.file) {
        const res = await ky.post(SEND_DOCUMENT_URI, {
          body: formData,
        })
        return res
      }
      const res = await ky.post(SEND_MESSAGE_URI, {
        json: {
          chat_id: CHAT_ID,
          text: `
Новая заявка на сайте
Имя: ${data.username}
Телефон: ${data.phone}
Telegram: ${data.telegram}
Сообщение: ${data.message}
`,
        },
      })
      return res
    } catch (e) {
      throw e
    }
  },
  async sendOrderMessage(data: { id: string } & z.infer<typeof orderSchema>) {
    try {
      const res = await ky.post(SEND_MESSAGE_URI, {
        json: {
          chat_id: CHAT_ID,
          text: `
<b>Новый заказ на сайте</b> 📦
<blockquote>${data.id}</blockquote>
Имя: ${data.username}
Телефон: <code>${data.phone}</code>
Telegram: ${data.telegram}
`,
          parse_mode: 'HTML',
        },
      })
    } catch (e) {
      throw e
    }
  },
}
