import { Color } from 'antd/es/color-picker'

export interface ColorSettings {
    success: string | Color
    warning: string | Color
    danger: string | Color
}

export interface TimeSettings {
    warning: number
    danger: number
}

type ColorKeys = {
    [K in keyof ColorSettings as string extends K
        ? never
        : number extends K
          ? never
          : K]: ColorSettings[K]
}
export type ColorKey = keyof ColorKeys

export type Settings = {
    order: {
        color: ColorSettings
        time: TimeSettings
    }
    gate: {
        color: ColorSettings
        time: TimeSettings
    }
}
