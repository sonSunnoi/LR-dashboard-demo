import { AntdRegistry } from '@ant-design/nextjs-registry'
import { config } from '@fortawesome/fontawesome-svg-core'
import { ConfigProvider } from 'antd'
import type { Metadata } from 'next'

import ReactQueryProvider from '@/modules/core/providers/ReactQueryProvider'

import '@fortawesome/fontawesome-svg-core/styles.css'

import '@/assets/css/globals.css'

config.autoAddCss = false

export const metadata: Metadata = {
    title: { template: '%s - LR Dashboard', default: 'LR Dashboard' },
}

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <html lang="en">
            <body>
                <ReactQueryProvider>
                    <ConfigProvider theme={{ cssVar: true }}>
                        <AntdRegistry>{children}</AntdRegistry>
                    </ConfigProvider>
                </ReactQueryProvider>
            </body>
        </html>
    )
}

export default RootLayout
