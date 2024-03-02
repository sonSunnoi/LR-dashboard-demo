import { useLocalStorageState } from 'ahooks'

import { StorageKey, defaultSettings } from '../constants'

const useSettings = () => {
    const [settings, setSettings] = useLocalStorageState(StorageKey.Settings, {
        defaultValue: defaultSettings,
    })

    const resetSettings = () => {
        setSettings(defaultSettings)
    }

    return { settings, setSettings, resetSettings }
}

export default useSettings
