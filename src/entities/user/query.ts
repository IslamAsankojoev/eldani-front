import { useQuery } from "react-query"
import { UserService } from "."

export const useUser = () => {
  return useQuery('user', () => UserService.getMe(), {
    cacheTime: 0,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    onError: (_) => {
      console.log('error')
    },
  })
}
