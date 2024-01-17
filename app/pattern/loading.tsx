import { Skeleton } from '@/shadcn/ui/skeleton'

const Pattern = async ({ searchParams }: { searchParams: { slug: string; id: string } }) => {
  return (
    <div className="flex py-10">
      <div className="flex-grow-[2]">{<Skeleton className="w-[520px] h-[520px]" />}</div>
      <div className="flex-grow-[3] p-10">
        <Skeleton className="w-80 h-10" />
        <Skeleton className="w-80 h-10" />
      </div>
    </div>
  )
}

export default Pattern
