import { GetGatesResponse } from '../api/gates'
import { Gate } from '../models'
import { GateState } from '../models/state'

export const mapServerGate = (serverGate: GetGatesResponse[number]): Gate => {
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
