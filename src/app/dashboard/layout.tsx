'use client'
import { Layout } from 'antd'
import { CollapseType } from 'antd/es/layout/Sider'
import { ReactNode, useState } from 'react'

import DashboardHeader from '@/modules/core/components/DashboardHeader'
import Navigation from '@/modules/core/components/Navigation'

const { Sider, Content } = Layout

export interface DashboardLayoutProps {
    children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [collapsed, setCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const handleBreakpoint = (broken: boolean) => {
        setIsMobile(broken)
    }

    const handleCollapse = (value: boolean, type?: CollapseType) => {
        setCollapsed(value)
    }

    const handleClick = () => {
        if (isMobile) {
            setCollapsed(true)
        }
    }

    return (
        <Layout className="min-h-screen">
            <Sider
                trigger={null}
                breakpoint="md"
                collapsedWidth={isMobile ? 0 : 80}
                onBreakpoint={handleBreakpoint}
                onCollapse={handleCollapse}
                collapsed={collapsed}
                collapsible
            >
                <Navigation collapsed={collapsed} onMenuClick={handleClick} />
            </Sider>
            <Layout className="h-screen" onClick={handleClick}>
                <DashboardHeader
                    collapsed={collapsed}
                    onToggleButtonClick={(e) => {
                        e.stopPropagation()
                        setCollapsed((value) => !value)
                    }}
                />
                <Content className="min-h-[280px] min-w-[calc(100vw-2rem)] md:min-w-fit my-6 mx-4 rounded-lg">
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default DashboardLayout
