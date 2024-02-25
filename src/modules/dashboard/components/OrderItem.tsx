import {
    faClock,
    faSnowflake,
    faTruck,
    faUser,
    faUserGear,
    faUserTie,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Flex, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

import useColor from '../hooks/useColor'
import { Order } from '../models'

import TimeSpent from './TimeSpent'

export interface OrderItemProps extends ComponentPropsWithoutRef<typeof Row> {
    order: Order
}

const OrderItem = ({ order, className, ...props }: OrderItemProps) => {
    const { order: orderColor } = useColor({ date: order.updatedAt })

    const {
        customerName,
        orderId,
        staffName,
        supervisorName,
        updatedAt,
        vehicleType,
    } = order

    return (
        <Row
            className={clsx(
                'w-full p-4 rounded hover:brightness-90 transition-all',
                className,
            )}
            style={{ backgroundColor: orderColor as string }}
            align="middle"
            {...props}
        >
            <Col xs={24} xl={8}>
                <Title className="mb-0 text-center text-slate-100">
                    <FontAwesomeIcon icon={faClock} />{' '}
                    <TimeSpent date={updatedAt} />
                </Title>
            </Col>
            <Col xs={24} xl={16} className="text-white">
                <Title level={4} className="text-center text-white">
                    <FontAwesomeIcon icon={faSnowflake} /> Order #{orderId}
                </Title>
                <Flex gap={16} justify="space-between">
                    <p className="truncate" title={staffName}>
                        <strong>
                            <FontAwesomeIcon icon={faUserGear} /> Staff:{' '}
                        </strong>
                        <span>{staffName}</span>
                    </p>
                    <p className="truncate" title={supervisorName}>
                        <strong>
                            <FontAwesomeIcon icon={faUserTie} /> Supervisor:{' '}
                        </strong>
                        <span>{supervisorName}</span>
                    </p>
                </Flex>
                <Flex gap={16} justify="space-between">
                    <p className="truncate" title={customerName}>
                        <strong>
                            <FontAwesomeIcon icon={faUser} /> Customer:{' '}
                        </strong>
                        <span>{customerName}</span>
                    </p>
                    <p className="truncate" title={vehicleType}>
                        <strong>
                            <FontAwesomeIcon icon={faTruck} /> Vehicle Type:{' '}
                        </strong>
                        <span>{vehicleType}</span>
                    </p>
                </Flex>
            </Col>
        </Row>
    )
}

export default OrderItem
