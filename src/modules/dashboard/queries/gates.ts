import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'

import { getGates } from '../api/gates'

export const queryKey = ['gates']

export const usePrefetchGatesQuery = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey,
        queryFn: getGates,
    })

    return { queryClient, state: dehydrate(queryClient) }
}

export const useGatesQuery = () => {
    return useQuery({ queryKey, queryFn: getGates })
}
