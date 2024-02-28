import apiClient from '@/modules/core/api/client'

export type GetGatesResponse = {
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

export const getGates = async () => {
    const response = await apiClient.get('dashboard', { cache: 'no-store' })

    return response.json<GetGatesResponse>()
}
