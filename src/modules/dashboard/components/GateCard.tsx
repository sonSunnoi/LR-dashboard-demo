'use client'
import {
    faClock,
    faSnowflake,
    faUserGear,
    faUserTie,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isNonEmptyString } from '@sindresorhus/is'
import { Card, Skeleton } from 'antd'
import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

import { fallbackColor } from '../constants'
import useColor from '../hooks/useColor'
import useIsClient from '../hooks/useIsClient'
import { Gate } from '../models'
import { GateState } from '../models/state'

import TimeSpent from './TimeSpent'

export interface GateCardProps extends ComponentPropsWithoutRef<typeof Card> {
    gate: Gate
}

const GateCard = ({ gate, className, ...props }: GateCardProps) => {
    const {
        displayName,
        orderId,
        staffName,
        supervisorName,
        state,
        updatedAt,
    } = gate

    const isClient = useIsClient()

    const { gate: gateColor } = useColor({ date: updatedAt })

    return (
        <Card
            title={displayName}
            classNames={{
                title: clsx(isClient && 'text-white', 'font-bold text-xl'),
            }}
            className={clsx(isClient && 'text-white', 'h-full', className)}
            style={
                isClient
                    ? {
                          backgroundColor:
                              state == GateState.Occupied
                                  ? (gateColor as string)
                                  : fallbackColor,
                      }
                    : {}
            }
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
                        {state === GateState.Occupied ? (
                            <TimeSpent date={updatedAt} />
                        ) : (
                            '--:--:--'
                        )}
                    </p>
                    <p className="text-2xl mb-1">
                        <strong>
                            <FontAwesomeIcon icon={faSnowflake} />
                        </strong>{' '}
                        {isNonEmptyString(orderId) ? `#${orderId}` : 'No Order'}
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
