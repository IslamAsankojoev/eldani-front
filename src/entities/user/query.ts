import { usePathname } from 'next/navigation'
import { useQuery } from 'react-query'

import { UserService } from '.'

export const useUser = () => {
  const pathname = usePathname()
  return useQuery(['user'], () => UserService.getMe(), {
    cacheTime: 0,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!pathname,
    onError: () => null,
  })
}
