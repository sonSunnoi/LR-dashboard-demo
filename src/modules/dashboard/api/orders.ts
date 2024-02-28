import apiClient from '@/modules/core/api/client'

export interface GetOrdersParams {
    stallTimeThreshold?: number
    isActive?: boolean
    skip?: number
    limit?: number
}

export type GetOrdersResponse = {
    id: number
    is_active: boolean
    customer_id: number
    gate_id: number
    entry_id: number
}[]

export const getOrders = async ({
    stallTimeThreshold,
    isActive = true,
    skip = 0,
    limit = 100,
}: GetOrdersParams) => {
    const response = await apiClient.get('orders', {
        searchParams: {
            ...(stallTimeThreshold && { stallTimeThreshold }),
            isActive,
            skip,
            limit,
        },
    })

    return response.json<GetOrdersResponse>()
}
