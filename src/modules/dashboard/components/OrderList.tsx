'use client'
import { Card, Empty, List, Skeleton } from 'antd'

import useSettings from '@/modules/setting/hooks/useSettings'

import { useDashboardOrdersQuery } from '../queries/dashboardOrders'
import { mapServerOrder } from '../utils'

import OrderItem from './OrderItem'

const OrderList = () => {
    const { settings } = useSettings()
    const {
        order: { stallTimeThreshold },
    } = settings || { order: { stallTimeThreshold: 0 } }
    const { data, isLoading } = useDashboardOrdersQuery({
        stallTimeThreshold: stallTimeThreshold * 60,
    })

    return (
        <Card
            title="Stall Orders"
            bordered={false}
            classNames={{ title: 'text-xl font-bold' }}
        >
            <List itemLayout="horizontal">
                {!isLoading ? (
                    data && data.length > 0 ? (
                        data.map((item) => (
                            <List.Item key={item.orderId}>
                                <OrderItem order={mapServerOrder(item)} />
                            </List.Item>
                        ))
                    ) : (
                        <Empty />
                    )
                ) : (
                    <Skeleton active />
                )}
            </List>
        </Card>
    )
}

export default OrderList
