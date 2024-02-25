import { Card, Skeleton } from 'antd'

const Loading = () => {
    return (
        <Card title="Settings" bordered={false}>
            <Skeleton />
        </Card>
    )
}

export default Loading
