import OrderList from './OrderList'

const LeftPanel = () => {
    // Note: Card style broken after calling the prefetch
    // const { state } = await usePrefetchDashboardOrdersQuery()

    return (
        // <HydrationBoundary state={state}>
        <OrderList />
        // </HydrationBoundary>
    )
}

export default LeftPanel
