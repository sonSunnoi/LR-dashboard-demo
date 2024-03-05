import {
    GetDashboardGatesResponse,
    GetDashboardOrdersResponse,
} from '../api/dashboard'
import { Gate, Order } from '../models'
import { GateState } from '../models/state'

export const mapServerGate = (
    serverGate: GetDashboardGatesResponse[number],
): Gate => {
    return {
        id: serverGate.gateId,
        displayName: serverGate.gateName,
        state: serverGate.gateStateName as GateState,
        orderId: serverGate.orderId?.toString() ?? '',
        staffName: serverGate.staffName ?? '-',
        supervisorName: serverGate.foreManName ?? '-',
        updatedAt: serverGate.timeStart ?? new Date().toString(), // timestamp
    }
}

export const mapServerOrder = ({
    orderId,
    staffName,
    timeStart,
}: GetDashboardOrdersResponse[number]): Order => {
    return {
        id: orderId,
        orderId: String(orderId),
        staffName,
        supervisorName: '-',
        customerName: '-',
        vehicleType: '-',
        updatedAt: timeStart,
    }
}
