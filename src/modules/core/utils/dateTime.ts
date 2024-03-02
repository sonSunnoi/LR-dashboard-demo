import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export const getDurationUntilNow = (date: Parameters<typeof dayjs>[0]) => {
    const dateObject = dayjs(date)

    if (!dateObject.isValid()) return dayjs.duration(0)

    return dayjs.duration(dayjs().diff(dateObject))
}

export const getDurationTextUntilNow = (date: Parameters<typeof dayjs>[0]) => {
    return getDurationUntilNow(date).format('HH:mm:ss')
}
