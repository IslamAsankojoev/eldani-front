'use client'

import { QueryClientProvider as Provider, QueryClient } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      cacheTime: 0,
      staleTime: 0,
    },
  },
})

export const QueryClientProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <Provider client={queryClient}>{children}</Provider>
}
