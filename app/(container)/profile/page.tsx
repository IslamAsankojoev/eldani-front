import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar"
import { Card } from "@/shadcn/ui/card";
import { UserService } from "@/src/entities/user"
import { cookies } from 'next/headers';

const Page = async () => {
  const token = cookies().get('token')?.value
  const user = await UserService.getMe({
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return (
    <div className="flex justify-center">
      <Card className="flex items-center space-x-4 p-4 dark:bg-[#1a1615] bg-white">
      <Avatar className="w-12 h-12">
        <AvatarImage src={user?.avatar_google} alt="@shadcn" />
        <AvatarFallback>{user?.email[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="">
        <p className="text-base font-bold">
          {user?.username}
        </p>
        <p className="text-sm">
          {user?.email}
        </p>
      </div>
    </Card>
    </div>
  )
}

export default Page
