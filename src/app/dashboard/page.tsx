import { Col, Row } from 'antd'
import { Metadata } from 'next'

import LeftPanel from '@/modules/dashboard/components/LeftPanel'
import RightPanel from '@/modules/dashboard/components/RightPanel'

export const metadata: Metadata = {
    title: 'Main',
}

const DashboardPage = async () => {
    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} md={24} lg={12} xxl={10}>
                <LeftPanel />
            </Col>
            <Col xs={24} md={24} lg={12} xxl={14}>
                <RightPanel />
            </Col>
        </Row>
    )
}

export default DashboardPage
