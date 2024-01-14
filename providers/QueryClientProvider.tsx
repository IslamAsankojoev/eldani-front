'use client'
import { QueryClient, QueryClientProvider as Provider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
      staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  },
})

export const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider client={queryClient}>{children}</Provider>
}
