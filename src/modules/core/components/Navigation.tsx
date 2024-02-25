import {
    FilePdfOutlined,
    HomeOutlined,
    SettingOutlined,
} from '@ant-design/icons'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu, MenuProps } from 'antd'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentPropsWithRef, ComponentPropsWithoutRef, useMemo } from 'react'

const menuItems: MenuProps['items'] = [
    {
        key: '/dashboard',
        icon: <HomeOutlined />,
        title: 'Main Dashboard',
        label: <Link href={'/dashboard'}>Main Dashboard</Link>,
    },
    {
        key: '/dashboard/report',
        icon: <FilePdfOutlined />,
        title: 'Report',
        label: <Link href={'/dashboard/report'}>Report</Link>,
    },
    {
        key: '/dashboard/settings',
        icon: <SettingOutlined />,
        title: 'Settings',
        label: <Link href={'/dashboard/settings'}>Settings</Link>,
    },
]

export interface NavigationProps {
    collapsed: boolean
    menuProps?: ComponentPropsWithRef<typeof Menu>
    logoSectionProps?: ComponentPropsWithoutRef<'div'>
    onMenuClick?: MenuProps['onClick']
}

const Navigation = ({
    collapsed,
    menuProps,
    logoSectionProps: {
        className: logoSectionClassName,
        ...logoSectionProps
    } = {},
    onMenuClick,
}: NavigationProps) => {
    const pathName = usePathname()

    const selectedKeys = useMemo<string[]>(
        () =>
            menuItems
                .map((item) => item?.key ?? '')
                .filter((key): key is string => key === pathName),
        [pathName],
    )

    return (
        <>
            <div
                className={clsx(
                    'w-full size-6 flex flex-row justify-center items-center h-16',
                    logoSectionClassName,
                )}
                {...logoSectionProps}
            >
                <span className="text-white text-lg text-center font-bold text-nowrap">
                    <span>
                        <FontAwesomeIcon icon={faSnowflake} />{' '}
                    </span>
                    <span
                        className={clsx(
                            'transition-opacity delay-100 ease-in',
                            collapsed ? 'opacity-0' : 'opacity-100',
                        )}
                    >
                        {!collapsed && 'LR Dashboard'}
                    </span>
                </span>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={selectedKeys}
                items={menuItems}
                onClick={onMenuClick}
                {...menuProps}
            />
        </>
    )
}

export default Navigation
