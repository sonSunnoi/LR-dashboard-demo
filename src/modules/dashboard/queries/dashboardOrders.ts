import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'

import { getDashboardOrders } from '../api/dashboard'

export const queryKey = ['dashboard-orders']

export const usePrefetchDashboardOrdersQuery = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey,
        queryFn: getDashboardOrders,
    })

    return { queryClient, state: dehydrate(queryClient) }
}

export const useDashboardOrdersQuery = () => {
    return useQuery({ queryKey, queryFn: getDashboardOrders })
}
