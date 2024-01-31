export const dayLater = (inputDate: string) => {
  const currentDate = new Date()

  // Преобразуем строку в объект Date
  const inputDateObject = new Date(inputDate)

  if (isNaN(inputDateObject.getTime())) {
    return 'Неверный формат даты'
  }

  const timeDifference =
    (currentDate.getTime() - inputDateObject.getTime()) / 1000
  const secondsPassed = Math.floor(timeDifference)

  const getDeclension = (value: number, words: string[]) => {
    const cases = [2, 0, 1, 1, 1, 2]
    return words[
      value % 100 > 4 && value % 100 < 20
        ? 2
        : cases[value % 10 < 5 ? value % 10 : 5]
    ]
  }

  if (secondsPassed < 60) {
    // менее 60 секунд
    return 'Только что'
  } else if (secondsPassed < 3600) {
    // менее 60 минут
    const minutesPassed = Math.floor(secondsPassed / 60)
    return `${minutesPassed} ${getDeclension(minutesPassed, ['мин.', 'мин.', 'мин.'])}`
  } else if (secondsPassed < 86400) {
    // менее 24 часов
    const hoursPassed = Math.floor(secondsPassed / 3600)
    return `${hoursPassed} ${getDeclension(hoursPassed, ['ч.', 'ч.', 'ч.'])}`
  } else if (secondsPassed < 2592000) {
    // менее 30 дней
    const daysPassed = Math.floor(secondsPassed / 86400)
    return `${daysPassed} ${getDeclension(daysPassed, ['д.', 'д.', 'д.'])}`
  } else if (secondsPassed < 31536000) {
    // менее 365 дней
    const monthsPassed = Math.floor(secondsPassed / 2592000)
    return `${monthsPassed} ${getDeclension(monthsPassed, ['мес.', 'мес.', 'мес.'])}`
  } else {
    // более 365 дней
    const yearsPassed = Math.floor(secondsPassed / 31536000)
    return `${yearsPassed} ${getDeclension(yearsPassed, ['год', 'года', 'лет'])}`
  }
}
