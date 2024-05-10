import { useQuery } from 'react-query'

import { UserService } from '.'

export const useUser = () => {
  return useQuery([UserService.entity], () => UserService.getMe(), {
    cacheTime: 0,
    staleTime: 0,
    retry: false,
  })
}
