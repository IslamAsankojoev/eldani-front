import { ReactNode } from 'react'

import { Heart, LogOut, ShoppingBag, Star, UserRound } from 'lucide-react'

export const navigationList = [
  { name: 'Каталог', href: '/' },
  { name: 'Заказать', href: '/make-order' },
  { name: 'Об Eldani', href: '/about' },
  { name: 'Контакты', href: '/contacts' },
]

export const policyNavigationList = [
  { name: 'Вопросы и ответы', href: '/policy/faq' },
  { name: 'Пользовательское соглашение', href: '/policy/terms' },
  { name: 'Политика конфиденциальности', href: '/policy/privacy' },
  { name: 'Условия возврата', href: '/policy/return' },
  { name: 'Покупка', href: '/policy/payment' },
]

interface ProfileNavigationItem {
  name: string
  href: string
  icon: any
}

export const profileNavigationList: ProfileNavigationItem[] = [
  { name: 'Профиль', href: '/me/profile', icon: UserRound },
  { name: 'Корзина', href: '/me/cart', icon: ShoppingBag },
  { name: 'Сохраненные', href: '/me/favorites', icon: Heart },
  { name: 'Выйти', href: '/api/logout', icon: LogOut },
]
