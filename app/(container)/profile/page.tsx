import { cookies } from 'next/headers'

import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import { Card } from '@/shadcn/ui/card'

import { UserService } from '@/src/entities/user'

const Page = async () => {
  const token = cookies().get('token')?.value
  const user = await UserService.getMe({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return (
    <div className="flex justify-center">
      <Card className="dark:bg-stone-920 flex items-center space-x-4 bg-white p-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user?.avatar_google} alt="@shadcn" />
          <AvatarFallback>{user?.email[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="">
          <p className="text-base font-bold">{user?.username}</p>
          <p className="text-sm">{user?.email}</p>
        </div>
      </Card>
    </div>
  )
}

export default Page
