'use client'
import {
    faClock,
    faSnowflake,
    faUserGear,
    faUserTie,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Skeleton } from 'antd'
import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

import useColor from '../hooks/useColor'
import useIsClient from '../hooks/useIsClient'
import { Gate } from '../models'

import TimeSpent from './TimeSpent'

const classNames = [
    'bg-red-500',
    'bg-orange-400',
    'bg-green-500',
    'bg-slate-400',
]

export interface GateCardProps extends ComponentPropsWithoutRef<typeof Card> {
    gate: Gate
}

const GateCard = ({ gate, className, ...props }: GateCardProps) => {
    const { displayName, orderId, staffName, supervisorName, updatedAt } = gate

    const isClient = useIsClient()

    const { gate: gateColor } = useColor({ date: updatedAt })

    return (
        <Card
            title={displayName}
            classNames={{
                title: clsx(isClient && 'text-white', 'font-bold text-xl'),
            }}
            className={clsx(isClient && 'text-white', 'h-full', className)}
            style={isClient ? { backgroundColor: gateColor as string } : {}}
            bordered={false}
            {...props}
        >
            {!isClient ? (
                <Skeleton active />
            ) : (
                <>
                    <p className="text-2xl mb-1">
                        <strong>
                            <FontAwesomeIcon icon={faClock} />
                        </strong>{' '}
                        <TimeSpent date={updatedAt} />
                    </p>
                    <p className="text-2xl mb-1">
                        <strong>
                            <FontAwesomeIcon icon={faSnowflake} />
                        </strong>{' '}
                        #{orderId}
                    </p>
                    <p>
                        <strong>
                            <FontAwesomeIcon icon={faUserGear} /> Staff:
                        </strong>{' '}
                        {staffName}
                    </p>
                    <p>
                        <strong>
                            <FontAwesomeIcon icon={faUserTie} /> Supervisor:
                        </strong>{' '}
                        {supervisorName}
                    </p>
                </>
            )}
        </Card>
    )
}

export default GateCard
