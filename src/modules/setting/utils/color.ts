import { ColorKey, ColorSettings } from '../models'

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
