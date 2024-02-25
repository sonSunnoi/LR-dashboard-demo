import { Card } from 'antd'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Report',
}

const ReportPage = () => {
    return (
        <Card title="Report" bordered={false}>
            <p>Report Page</p>
        </Card>
    )
}

export default ReportPage
