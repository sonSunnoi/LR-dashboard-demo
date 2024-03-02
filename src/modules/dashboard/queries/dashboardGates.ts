import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'

import { getDashboardGates } from '../api/dashboard'

export const queryKey = ['dashboard-gates']

export const usePrefetchDashboardGatesQuery = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey,
        queryFn: getDashboardGates,
    })

    return { queryClient, state: dehydrate(queryClient) }
}

export const useDashboardGatesQuery = () => {
    return useQuery({ queryKey, queryFn: getDashboardGates })
}
