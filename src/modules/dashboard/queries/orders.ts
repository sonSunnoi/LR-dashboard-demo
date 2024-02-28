import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'

import { GetOrdersParams, getOrders } from '../api/orders'

export const queryKey = ['orders']

export const usePrefetchOrdersQuery = async (params: GetOrdersParams) => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey,
        queryFn: () => getOrders(params),
    })

    return { queryClient, state: dehydrate(queryClient) }
}

export const useOrdersQuery = (params: GetOrdersParams) => {
    return useQuery({ queryKey, queryFn: () => getOrders(params) })
}
