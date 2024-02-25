import { useInterval } from 'ahooks'
import dayjs from 'dayjs'
import { useState } from 'react'

import { defaultColor, defaultTime, fallbackColor } from '../constants'
import { Settings } from '../models/settings'
import { getDurationUntilNow } from '../utils'

import useIsClient from './useIsClient'
import useSettings from './useSettings'

export interface UseColorProps {
    date: Parameters<typeof dayjs>[0]
}

const useColor = ({ date }: UseColorProps) => {
    const isClient = useIsClient()
    const { settings } = useSettings()

    const getColorMap = (key: keyof Settings) => {
        if (!isClient) return defaultColor

        return settings?.[key].color ?? defaultColor
    }

    const getTimeMap = (key: keyof Settings) => {
        if (!isClient) return defaultTime

        return settings?.[key].time ?? defaultTime
    }

    const getColorType = (key: keyof Settings) => {
        const duration = getDurationUntilNow(date).asMinutes()
        const timeMap = getTimeMap(key)
        const colorMap = getColorMap(key)

        if (duration <= 0) {
            return fallbackColor
        } else if (duration < timeMap.warning) {
            return colorMap.success as string
        } else if (duration < timeMap.danger) {
            return colorMap.warning as string
        } else {
            return colorMap.danger as string
        }
    }

    const [color, setColor] = useState<{ gate: string; order: string }>({
        gate: getColorType('gate'),
        order: getColorType('order'),
    })

    useInterval(
        () => {
            setColor({
                gate: getColorType('gate'),
                order: getColorType('order'),
            })
        },
        1000,
        { immediate: true },
    )

    return color
}

export default useColor
