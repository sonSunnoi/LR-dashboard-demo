import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import { ColorKey, ColorSettings } from '../models/settings'

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
