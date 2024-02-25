import { ColorSettings, Settings, TimeSettings } from './models/settings'

export enum StorageKey {
    Settings = 'lr-dashboard-settings',
}

export const fallbackColor = '#8c8c8c'

export const defaultColor: ColorSettings = {
    success: '#52c41a',
    warning: '#faad14',
    danger: '#ff4d4f',
}

export const defaultTime: TimeSettings = {
    warning: 30,
    danger: 60,
}

export const defaultSettings: Settings = {
    order: {
        color: defaultColor,
        time: defaultTime,
    },
    gate: {
        color: defaultColor,
        time: defaultTime,
    },
}
