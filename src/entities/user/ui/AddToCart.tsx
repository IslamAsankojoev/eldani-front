import { FC, useState } from 'react'

import _ from 'lodash'

import { Button } from '@/shadcn/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/ui/dialog'
import { ToggleGroup, ToggleGroupItem } from '@/shadcn/ui/toggle-group'

import { useCartStore } from '@/src/app/store/cart.zustand'

export const AddToCart: FC<Pattern> = (pattern) => {
  const [open, setOpen] = useState(false)
  const { addToCart } = useCartStore()
  const [selectedSize, setSelectedSize] = useState<string[]>([])
  const isEmpty = _.isEmpty(pattern?.sizes)

  const handleSizeChange = (value: string[]) => {
    setSelectedSize(value)
  }

  const handleAddToCart = () => {
    addToCart({
      ...pattern,
      id:
        pattern.id + selectedSize.reduce((acc, size) => acc + Number(size), 0),
      sizes: pattern?.sizes?.filter((size) =>
        selectedSize.includes(size.value),
      ),
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>В корзину</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isEmpty ? (
          <DialogHeader>
            <DialogTitle>Выберите размер</DialogTitle>
            <DialogDescription>
              К сожалению, размеры для этого товара еще не добавлены в базу и
              заказать его не получится
            </DialogDescription>
          </DialogHeader>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Выберите размер</DialogTitle>
              <DialogDescription>
                Каждый размер продается отдельно, выберите нужный вам размер или
                можете выбрать несколько
              </DialogDescription>
            </DialogHeader>
            <ToggleGroup
              type="multiple"
              className="justify-center md:justify-start"
              onValueChange={handleSizeChange}
            >
              {pattern.sizes.map((size) => (
                <ToggleGroupItem
                  key={size.value}
                  value={size.value}
                  variant="outline"
                >
                  {size.value}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <DialogFooter className="sm:justify-start">
              <Button onClick={handleAddToCart}>Добавить в корзину</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
