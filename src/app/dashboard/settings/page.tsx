import { Card } from 'antd'
import { Metadata } from 'next'

import SettingsForm from '@/modules/setting/components/SettingsForm'

export const metadata: Metadata = {
    title: 'Settings',
}

const SettingsPage = () => {
    return (
        <Card title="Settings" bordered={false}>
            <SettingsForm />
        </Card>
    )
}

export default SettingsPage
