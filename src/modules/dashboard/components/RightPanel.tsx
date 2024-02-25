import { Col, Row } from 'antd'

import { MOCK_GATES } from '../mocks/gates'

import GateCard from './GateCard'

const RightPanel = () => {
    return (
        <Row gutter={[16, 16]}>
            {MOCK_GATES.map((gate) => (
                <Col xs={24} sm={12} xxl={6} key={gate.id}>
                    <GateCard gate={gate} />
                </Col>
            ))}
        </Row>
    )
}

export default RightPanel
