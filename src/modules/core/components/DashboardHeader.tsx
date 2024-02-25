'use client'
import {
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Button, Dropdown, Layout, Space } from 'antd'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, MouseEventHandler } from 'react'

const { Header } = Layout

export interface DashboardHeaderProps
    extends ComponentPropsWithoutRef<typeof Header> {
    collapsed: boolean
    onToggleButtonClick?: MouseEventHandler<HTMLButtonElement>
}

const DashboardHeader = ({
    collapsed,
    className,
    onToggleButtonClick,
    ...props
}: DashboardHeaderProps) => {
    return (
        <Header
            className={clsx(
                'p-0 bg-white flex flex-row items-center sticky top-0 z-10 shadow-sm',
                className,
            )}
            {...props}
        >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                className="w-16 h-16 text-base"
                onClick={onToggleButtonClick}
            />
            <div className="flex items-center justify-end flex-grow mr-4">
                <Space>
                    <Dropdown
                        menu={{
                            items: [
                                { key: 'en', label: 'English' },
                                { key: 'th', label: 'ภาษาไทย' },
                            ],
                            selectedKeys: ['en'],
                        }}
                        placement="bottomLeft"
                        trigger={['click']}
                        arrow
                    >
                        <Button>
                            <span className="hidden md:inline">
                                English <DownOutlined />
                            </span>
                            <span className="inline md:hidden">
                                <FontAwesomeIcon icon={faGlobe} />
                            </span>
                        </Button>
                    </Dropdown>
                    <Button type="text" size="large" className="h-16 text-base">
                        <Space>
                            <Avatar icon={<UserOutlined />} />
                            <span className="hidden md:inline">Guest</span>
                        </Space>
                    </Button>
                </Space>
            </div>
        </Header>
    )
}

export default DashboardHeader
