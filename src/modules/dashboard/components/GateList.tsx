'use client'

import { Button, Card, Col, Result, Row, Skeleton } from 'antd'
import { range } from 'lodash-es'

import { useGatesQuery } from '../queries/gates'
import { mapServerGate } from '../utils'

import GateCard from './GateCard'

const GateList = () => {
    const { isLoading, data, isSuccess, refetch } = useGatesQuery()

    return (
        <Row gutter={[16, 16]}>
            {isLoading &&
                range(10).map((num) => {
                    return (
                        <Col xs={24} sm={12} xxl={6} key={num}>
                            <Card title={<Skeleton />}>
                                <Skeleton />
                            </Card>
                        </Col>
                    )
                })}
            {isSuccess && data ? (
                data.map((gate) => {
                    return (
                        <Col xs={24} sm={12} xxl={6} key={gate.gateId}>
                            <GateCard gate={mapServerGate(gate)} />
                        </Col>
                    )
                })
            ) : (
                <Col>
                    <Card>
                        <Result
                            status="500"
                            title="500"
                            subTitle="Sorry, something went wrong."
                            extra={
                                <Button
                                    type="primary"
                                    onClick={() => refetch()}
                                >
                                    Reload
                                </Button>
                            }
                        />
                    </Card>
                </Col>
            )}
        </Row>
    )
}

export default GateList
