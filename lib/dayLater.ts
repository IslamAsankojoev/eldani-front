function dayLater(inputDate: string) {
  const currentDate = new Date()

  // Преобразуем строку в объект Date
  const inputDateObject = new Date(inputDate)

  if (isNaN(inputDateObject.getTime())) {
    return 'Неверный формат даты'
  }

  const timeDifference = (currentDate.getTime() - inputDateObject.getTime()) / 1000
  const secondsPassed = Math.floor(timeDifference)

  if (secondsPassed < 60) {
    return 'Только что'
  } else if (secondsPassed < 3600) {
    const minutesPassed = Math.floor(secondsPassed / 60)
    return `${minutesPassed} мин. `
  } else if (secondsPassed < 86400) {
    const hoursPassed = Math.floor(secondsPassed / 3600)
    return `${hoursPassed} часа `
  } else if (secondsPassed < 2592000) {
    // менее 30 дней
    const daysPassed = Math.floor(secondsPassed / 86400)
    return `${daysPassed} дн. `
  } else if (secondsPassed < 31536000) {
    // менее 365 дней
    const monthsPassed = Math.floor(secondsPassed / 2592000)
    return `${monthsPassed} м.`
  } else {
    const yearsPassed = Math.floor(secondsPassed / 31536000)
    return `${yearsPassed} г.`
  }
}

export default dayLater
