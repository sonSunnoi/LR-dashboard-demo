import { Card, Skeleton } from 'antd'

const Loading = () => {
    return (
        <Card title="Report" bordered={false}>
            <Skeleton />
        </Card>
    )
}

export default Loading
