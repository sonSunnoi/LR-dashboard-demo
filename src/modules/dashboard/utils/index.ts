import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import { GetGatesResponse } from '../api/gates'
import { Gate } from '../models'
import { ColorKey, ColorSettings } from '../models/settings'
import { GateState } from '../models/state'

dayjs.extend(duration)

export const getDurationUntilNow = (date: Parameters<typeof dayjs>[0]) => {
    const dateObject = dayjs(date)

    if (!dateObject.isValid()) return dayjs.duration(0)

    return dayjs.duration(dayjs().diff(dateObject))
}

export const getDurationTextUntilNow = (date: Parameters<typeof dayjs>[0]) => {
    return getDurationUntilNow(date).format('HH:mm:ss')
}

export const processColor = (values: ColorSettings) => {
    const processedValues: ColorSettings = {} as ColorSettings
    for (const [key, value] of Object.entries(values) as [
        ColorKey,
        ColorSettings[ColorKey],
    ][]) {
        processedValues[key as ColorKey] =
            typeof value === 'object' ? value.toHexString() : value
    }

    return processedValues
}

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
