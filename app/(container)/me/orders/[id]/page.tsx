'use client'

import { ArrowDownToLine, MoveLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'

import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'

import { OrderService } from '@/src/entities/order'

import PDF from '/public/pdf.svg'

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const { data: order } = useQuery(['order', params.id], () =>
    OrderService.findOne(params.id),
  )
  return (
    <div className="flex h-full flex-col">
      <h1 className="flex items-center p-0 pt-1 text-2xl font-bold">
        <Button
          variant="link"
          className="py-0"
          onClick={() => {
            router.back()
          }}
        >
          <MoveLeft />
        </Button>
        Заказ {order?.uuid && '#' + order?.uuid}
      </h1>
      <Card className="mt-2 flex flex-col gap-6 border-none p-4 dark:bg-stone-950/60">
        {order?.products?.map((pattern) => (
          <div key={pattern.id} className=" flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="px-4 text-xl font-bold">{pattern.name}</div>
              </div>
              {pattern?.sizes?.map((size) => (
                <div key={size.id} className="flex flex-col gap-2">
                  <div>
                    <Button
                      variant="secondary"
                      asChild
                      className="flex items-center justify-between"
                    >
                      <a href={size?.file?.url} download>
                        <div className="flex items-center justify-start gap-2">
                          <Image
                            src={PDF}
                            alt={size.value || 'PDF'}
                            width={25}
                            height={25}
                            className="rounded-md"
                          />
                          <span>{size.value || 'PDF'}</span>
                          <span>размер</span>
                        </div>
                        <div>
                          <ArrowDownToLine className="h-4 w-4" />
                        </div>
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}

export default Page
