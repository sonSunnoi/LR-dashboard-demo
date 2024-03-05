import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'

import { GetDashboardOrdersParams, getDashboardOrders } from '../api/dashboard'

export const queryKey = (
    params: GetDashboardOrdersParams = { stallTimeThreshold: 0 },
) => ['dashboard-orders', params]

export const usePrefetchDashboardOrdersQuery = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: queryKey(),
        queryFn: () => getDashboardOrders(),
    })

    return { queryClient, state: dehydrate(queryClient) }
}

export const useDashboardOrdersQuery = ({
    stallTimeThreshold = 0,
}: { stallTimeThreshold?: number } = {}) => {
    return useQuery({
        queryKey: queryKey({ stallTimeThreshold }),
        queryFn: () => getDashboardOrders({ stallTimeThreshold }),
    })
}
