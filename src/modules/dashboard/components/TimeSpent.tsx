'use client'
import { useInterval } from 'ahooks'
import dayjs from 'dayjs'
import { ComponentPropsWithoutRef, useState } from 'react'

import { getDurationTextUntilNow } from '../utils'

export interface TimeSpentProps extends ComponentPropsWithoutRef<'span'> {
    date: Parameters<typeof dayjs>[0]
}

const TimeSpent = ({ date, ...props }: TimeSpentProps) => {
    const [durationText, setDurationText] = useState<string>(
        getDurationTextUntilNow(date),
    )

    useInterval(
        () => {
            setDurationText(getDurationTextUntilNow(date))
        },
        1000,
        { immediate: true },
    )

    return (
        <span {...props} suppressHydrationWarning>
            {durationText ? durationText : ''}
        </span>
    )
}

export default TimeSpent
