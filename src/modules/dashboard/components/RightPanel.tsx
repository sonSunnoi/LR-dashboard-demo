import { HydrationBoundary } from '@tanstack/react-query'

import { usePrefetchDashboardGatesQuery } from '../queries/dashboardGates'

import GateList from './GateList'

const RightPanel = async () => {
    const { state } = await usePrefetchDashboardGatesQuery()

    return (
        <HydrationBoundary state={state}>
            <GateList />
        </HydrationBoundary>
    )
}

export default RightPanel
