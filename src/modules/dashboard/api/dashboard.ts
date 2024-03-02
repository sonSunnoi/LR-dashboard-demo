import apiClient from '@/modules/core/api/client'

export type GetDashboardGatesResponse = {
    gateId: number
    gateName: string
    gateState: number
    gateStateName: string
    timeStart: string | null
    timeFromStart: number | null
    orderId: number | null
    staffName: string | null
    foreManName: string | null
    vehicleName: string | null
    vehicleType: number | null
    vehicleTypeName: string | null
}[]

export type GetDashboardOrdersResponse = {
    orderId: number
    staffName: string
    timeStart: string
    timeFromStart: number
}[]

export const getDashboardGates = async () => {
    const response = await apiClient.get('dashboard', { cache: 'no-store' })

    return response.json<GetDashboardGatesResponse>()
}

export const getDashboardOrders = async () => {
    const response = await apiClient.get('dashboard/current_transaction', { cache: 'no-store' })

    return response.json<GetDashboardOrdersResponse>()
}