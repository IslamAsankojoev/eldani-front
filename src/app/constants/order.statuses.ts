import { Status } from '@/src/shared/types/global.exports'
import colors from 'tailwindcss/colors'

export const StatusTranslations: { [key in Status]: string } = {
  [Status.PendingPayment]: 'ожидание оплаты',
  [Status.PaymentError]: 'ошибка оплаты',
  [Status.Paid]: 'оплачено',
  [Status.Cancelled]: 'отменено',
}

export function translateStatus(status: string): string {
  if (Object.values(Status).includes(status as Status)) {
    return StatusTranslations[status as Status]
  }
  return 'неизвестный статус'
}

export function statusColor(status: Status): string {
  switch (status) {
    case Status.PendingPayment:
      return colors.yellow[500]
    case Status.PaymentError:
      return colors.red[500]
    case Status.Paid:
      return colors.green[500]
    case Status.Cancelled:
      return colors.gray[500]
    default:
      return colors.gray[500]
  }
}
