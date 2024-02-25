'use client'
import { Card, List, Skeleton } from 'antd'
import { useEffect, useState } from 'react'

import { MOCK_ORDERS } from '../mocks/orders'
import { Order } from '../models'

import OrderItem from './OrderItem'

const LeftPanel = () => {
    const [data, setData] = useState<Order[]>([])

    useEffect(() => {
        setData(MOCK_ORDERS)
    }, [])

    return (
        <Card
            title="Stall Orders"
            bordered={false}
            classNames={{ title: 'text-xl font-bold' }}
        >
            <List itemLayout="horizontal">
                {data.length > 0 ? (
                    data.map((item) => (
                        <List.Item key={item.id}>
                            <OrderItem order={item} />
                        </List.Item>
                    ))
                ) : (
                    <Skeleton active />
                )}
            </List>
        </Card>
    )
}

export default LeftPanel
